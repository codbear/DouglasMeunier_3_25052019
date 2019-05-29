(function(window, document) {
    class ModalBox {

        constructor() {
            this.modalBox = null;
        }

        openBox(event) {
            event.preventDefault();
            this.modalBox = document.querySelector(event.target.dataset.target);
            this.modalBox.style.display = null;
            const closeBoxBound = this.closeBox.bind(this);
            const stopPropagationBound = this.stopPropagation.bind(this);
            this.modalBox.addEventListener('click', closeBoxBound);
            this.modalBox.querySelector('.close-modal-box').addEventListener('click', closeBoxBound);
            this.modalBox.querySelector('.modal-box-wrapper').addEventListener('click', stopPropagationBound);
        }
    }

    window.ModalBox = ModalBox;
})(window, document);
