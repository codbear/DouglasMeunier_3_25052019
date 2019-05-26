(function(window, document) {
    class Slider {

        constructor(userContainer, userOptions = {}) {
            this.userContainer = userContainer;
            this.userOptions = Object.assign({}, {
                slidesToScroll: 1,
                slidesVisible: 1
            }, userOptions);
            this.isSmallScreen = false;
            this.currentSlide = 0;
            this.createHtmlStructure();
            this.setStyle();
            this.createNavigation();
            this.onWindowResize();
            const onWindowResizeBound = this.onWindowResize.bind(this);
            window.addEventListener('resize', onWindowResizeBound);
        }

        get slidesVisible() {
            return this.isSmallScreen ? 1 : this.userOptions.slidesVisible;
        }

        get slidesToScroll() {
            return this.isSmallScreen ? 1 : this.userOptions.slidesToScroll;
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

        setStyle() {
            let displayRatio = this.slides.length / this.slidesVisible;
            this.container.style.width = (displayRatio * 100) + '%';
            this.slides.forEach(slide => slide.style.width = ((100 / this.slidesVisible) / displayRatio) + '%');
        }

        createNavigation() {
            let nextButton = document.createElement('i');
            nextButton.classList.add('cdw-slider-nextBtn', 'material-icons', 'medium');
            nextButton.textContent = 'chevron_right';
            this.root.appendChild(nextButton);
            let prevButton = document.createElement('i');
            prevButton.classList.add('cdw-slider-prevBtn', 'material-icons', 'medium');
            prevButton.textContent = 'chevron_left';
            this.root.appendChild(prevButton);
            nextButton.addEventListener('click', this.moveNext.bind(this));
            prevButton.addEventListener('click', this.movePrev.bind(this));
            this.root.addEventListener('keyup', e => {
                if (e.key === 'ArrowRight' || e.key === 'Right') {
                    this.moveNext();
                } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                    this.movePrev();
                }
            })
        }

        moveNext() {
            this.gotoSlide(this.currentSlide + this.slidesToScroll);
        }

        movePrev() {
            this.gotoSlide(this.currentSlide - this.slidesToScroll);
        }

        gotoSlide(sliderIndex) {
            if (sliderIndex < 0) {
                sliderIndex = this.slides.length - this.slidesVisible;
            } else if (sliderIndex >= this.slides.length || (this.slides[this.currentSlide + this.slidesVisible] === undefined && sliderIndex > this.currentSlide)) {
                sliderIndex = 0;
            }
            let translateX = sliderIndex * -100 / this.slides.length;
            this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
            this.currentSlide = sliderIndex;
        }

        onWindowResize() {
            let isSmallScreen = window.innerWidth < 800;
            if (isSmallScreen !== this.isSmallScreen) {
                this.isSmallScreen = isSmallScreen;
                this.setStyle();
            }
        }
    }

    window.Slider = Slider;
})(window, document)
