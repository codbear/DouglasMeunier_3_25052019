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

        setDetails(station) {
            switch (station.status) {
                case 'OPEN':
                    this.status.textContent = 'Ouvert';
                    this.status.classList.add('green-text');
                    break;
                case 'CLOSED':
                    this.status.textContent = 'Fermé';
                    this.status.classList.add('red-text');
                    break;
                default :
                    this.status.textContent = 'Impossible de récupérer l\'état de la station';
            }
            this.adress.textContent = station.adress.toLowerCase();
            this.adress.classList.add('capitalize');
            this.availableBikes.textContent = station.available_bikes + ' vélos dispônibles';
            this.availableBikeStands.textContent = station.available_bike_stands + ' places disponibles';
        }
    }

    window.StationDetails = StationDetails;
})(window, document)
