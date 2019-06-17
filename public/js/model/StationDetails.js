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
            this.status.setAttribute('id', 'station-status');
            this.address = document.createElement('adress');
            this.address.setAttribute('id', 'station-address');
            this.availableBikes = document.createElement('p');
            this.availableBikes.setAttribute('id', 'available-bikes');
            this.availableBikeStands = document.createElement('p');
            this.availableBikeStands.setAttribute('id', 'available-bike-stand');
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
                    this.status.classList.remove('red-text');
                    this.status.classList.add('green-text');
                    this.stationDetails.dataset.status = 'open';
                    break;
                case 'CLOSED':
                    this.status.textContent = 'Fermé';
                    this.status.classList.remove('green-text');
                    this.status.classList.add('red-text');
                    this.stationDetails.dataset.status = 'close';
                    break;
                default :
                    this.status.textContent = 'Impossible de récupérer l\'état de la station';
                    this.status.classList.remove('green-text');
                    this.status.classList.add('red-text');
                    this.stationDetails.dataset.status = 'close';
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
            this.stationDetails.dataset.availableBikes = station.available_bikes;
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
