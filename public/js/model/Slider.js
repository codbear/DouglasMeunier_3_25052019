(function(window, document) {
    class Slider {

        constructor(userContainer, userOptions = {}) {
            this.userContainer = userContainer;
            this.userOptions = Object.assign({}, {
                slidesToScroll: 1,
                slidesVisible: 1
            }, userOptions);
            this.createHtmlStructure();
        }

        createHtmlStructure() {
            const userContainerChildren = [].slice.call(this.userContainer.children);
            this.root = document.createElement('div');
            this.root.classList.add('cdw-slider');
            this.root.setAttribute('tabindex', '0');
            this.container = document.createElement('div');
            this.container.classList.add('cdw-slider-container');
            this.root.appendChild(this.container);
            this.userContainer.appendChild(this.root);
            this.slides = userContainerChildren.map(child => {
                let slide = document.createElement('div');
                slide.classList.add('cdw-slide');
                slide.appendChild(child);
                this.container.appendChild(slide);
                return slide;
            })
        }
    }

    window.Slider = Slider;
})(window, document)
