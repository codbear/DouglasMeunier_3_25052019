(function(window, document) {
    class StationDetails {

        constructor(stationDetailsContainer) {
            this.stationDetailsContainer = stationDetailsContainer;
            this.callToAction = this.stationDetailsContainer.querySelector('.call-to-action');
            this.stationDetails = this.stationDetailsContainer.querySelector('#station-details');
            this.createHtmlElements();
        }

        createHtmlElements() {
            this.status = document.createElement('p');
            this.address = document.createElement('adress');
            this.availableBikes = document.createElement('p');
            this.availableBikeStands = document.createElement('p');
        }

        createHtmlStructure() {
            this.callToAction.style.display = 'none';
            this.stationDetails.appendChild(this.status);
            this.stationDetails.appendChild(this.address);
            this.stationDetails.appendChild(this.availableBikes);
            this.stationDetails.appendChild(this.availableBikeStands);
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

        displayDetails(station) {
            this.setDetails(station);
            this.createHtmlStructure();
        }

        hideDetails() {
            this.stationDetails.innerHTML = "";
        }
    }

    window.StationDetails = StationDetails;
})(window, document)
