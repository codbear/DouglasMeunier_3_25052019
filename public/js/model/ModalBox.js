(function(window, document) {
    class ModalBox {

        constructor(triggerBtn, shouldListenTrigger = false) {
            this.triggerBtn = triggerBtn;
            this.modalBox = null;
            this.openBox = this.openBox.bind(this);
            this.closeBox = this.closeBox.bind(this);
            const closeOnEscapeBound = this.closeOnEscape.bind(this);
            window.addEventListener('keydown', closeOnEscapeBound);
            if (shouldListenTrigger) this.listenTrigger();
        }

        listenTrigger(event) {
            this.triggerBtn.addEventListener('click', this.openBox);
        }

        openBox(event) {
            event.preventDefault();
            this.modalBox = document.querySelector(this.triggerBtn.dataset.target);
            this.contentWrapper = this.modalBox.querySelector('.modal-box-wrapper');
            this.closeBtn = this.modalBox.querySelector('.close-modal-box');
            this.modalBox.style.removeProperty('display');
            this.modalBox.addEventListener('click', this.closeBox);
            this.closeBtn.addEventListener('click', this.closeBox);
            this.contentWrapper.addEventListener('click', this.stopPropagation);
        }

        closeBox(event) {
            if (this.modalBox === null) return;
            event.preventDefault();
            this.modalBox.style.display = 'none';
            this.modalBox.removeEventListener('click', this.closeBox);
            this.closeBtn.removeEventListener('click', this.closeBox);
            this.contentWrapper.removeEventListener('click', this.stopPropagation);
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

        destruct() {
            this.triggerBtn.removeEventListener('click', this.openBox);
            window.removeEventListener('keydown', this.closeOnEscape);
        }
    }

    window.ModalBox = ModalBox;
})(window, document);
