(function(window, document) {
    class Slider {

        constructor(userContainer, userOptions = {}) {
            this.userContainer = userContainer;
            this.userOptions = Object.assign({}, {
                slidesToScroll: 1,
                slidesVisible: 1
            }, userOptions);
        }
    }

    window.Slider = Slider;
})(window, document)
