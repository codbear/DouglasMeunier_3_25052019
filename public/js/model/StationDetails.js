(function(window, document) {
    class StationDetails {

        constructor(userContainer) {
            this.userContainer = userContainer;
            this.createHtmlElements();
        }

        createHtmlElements() {
            this.status = document.createElement('p');
            this.adress = document.createElement('adress');
            this.availableBikes = document.createElement('p');
            this.availableBikeStands = document.createElement('p');
        }
    }

    window.StationDetails = StationDetails;
})(window, document)
