(function(window, document) {
    class StationDetails {

        constructor(userContainer) {
            this.userContainer = userContainer;
            this.createHtmlElements();
        }

        createHtmlElements() {
            this.status = document.createElement('p');
            this.address = document.createElement('adress');
            this.availableBikes = document.createElement('p');
            this.availableBikeStands = document.createElement('p');
        }

        createHtmlStructure() {
            document.querySelector('#call-to-action').style.display = 'none';
            this.userContainer.appendChild(this.status);
            this.userContainer.appendChild(this.address);
            this.userContainer.appendChild(this.availableBikes);
            this.userContainer.appendChild(this.availableBikeStands);
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
            this.address.textContent = station.address.toLowerCase();
            this.address.classList.add('capitalize');
            if (station.available_bikes > 1) {
                this.availableBikes.textContent = station.available_bikes + ' vélos disponibles';
                this.availableBikes.classList.remove('red-text');
            } else if (station.available_bikes === 1) {
                this.availableBikes.textContent = station.available_bikes + ' vélo disponible';
                this.availableBikes.classList.remove('red-text');
            } else {
                this.availableBikes.textContent = 'Aucun vélo disponible';
                this.availableBikes.classList.add('red-text');
            }
            if (station.available_bike_stands > 1) {
                this.availableBikeStands.textContent = station.available_bike_stands + ' places disponibles';
                this.availableBikeStands.classList.remove('red-text');
            } else if (station.available_bike_stands === 1) {
                this.availableBikeStands.textContent = station.available_bike_stands + ' place disponible';
                this.availableBikeStands.classList.remove('red-text');
            } else {
                this.availableBikeStands.textContent = 'Aucune place disponible';
                this.availableBikeStands.classList.add('red-text');
            }
        }
    }

    window.StationDetails = StationDetails;
})(window, document)
