(function(window, document) {
    class ModalBox {

        constructor(button) {
            this.button = button;
            this.modalBox = null;
            const openModalBoxBound = this.openBox.bind(this);
            this.button.addEventListener('click', openModalBoxBound);
            const closeOnEscapeBound = this.closeOnEscape.bind(this);
            window.addEventListener('keydown', closeOnEscapeBound);
        }

        openBox(event) {
            event.preventDefault();
            this.modalBox = document.querySelector(event.target.dataset.target);
            this.contentWrapper = this.modalBox.querySelector('.modal-box-wrapper');
            this.closeBtn = this.modalBox.querySelector('.close-modal-box');
            this.modalBox.style.display = null;
            const closeBoxBound = this.closeBox.bind(this);
            const stopPropagationBound = this.stopPropagation.bind(this);
            this.modalBox.addEventListener('click', closeBoxBound);
            this.closeBtn.addEventListener('click', closeBoxBound);
            this.contentWrapper.addEventListener('click', stopPropagationBound);
        }

        closeBox(event) {
            if (this.modalBox === null) return;
            event.preventDefault();
            this.modalBox.style.display = 'none';
            const closeBoxBound = this.closeBox.bind(this);
            const stopPropagationBound = this.stopPropagation.bind(this);
            this.closeBtn.removeEventListener('click', closeBoxBound);
            this.contentWrapper.removeEventListener('click', stopPropagationBound);
            this.modalBox = null;
        }

        closeOnEscape(event) {
            if (event.key === 'Escape' || event.key === 'Esc') {
                this.closeBox(event);
            }
        }

        stopPropagation(event) {
            event.stopPropagation();
        }
    }

    window.ModalBox = ModalBox;
})(window, document);
