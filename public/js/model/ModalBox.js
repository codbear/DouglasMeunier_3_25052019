(function(window, document) {
    class ModalBox {

        constructor() {
            this.modalBox = null;
            this.contentWrapper = this.modalBox.querySelector('.modal-box-wrapper');
            this.closeBtn = this.modalBox.querySelector('.close-modal-box');
        }

        openBox(event) {
            event.preventDefault();
            this.modalBox = document.querySelector(event.target.dataset.target);
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

        stopPropagation(event) {
            event.stopPropagation();
        }
    }

    window.ModalBox = ModalBox;
})(window, document);
