(function(window, document) {
    class Reservation {

        constructor(reservationForm, reservationDetailsRoot) {
            this.reservationForm = reservationForm;
            this.reservationDetailsRoot = reservationDetailsRoot;
            this.firstName = this.reservationForm.firstName.value
            this.lastName = this.reservationForm.lastName.value
        }

        isStorageAvailable(type) {
            try {
                let storage = window[type],
                    x = '__storage_test__';
                storage.setItem(x, x);
                storage.removeItem(x);
                return true;
            }
            catch(e) {
                return e instanceof DOMException && (
                    e.code === 22 ||
                    e.code === 1014 ||
                    e.name === 'QuotaExceededError' ||
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                    storage.length !== 0;
            }
        }

        storeUserIdentity() {
            if (!this.isStorageAvailable('localStorage')) {
                return;
            }
            localStorage.setItem('firstName', this.firstName);
            localStorage.setItem('lastName', this.lastName);
        }

        recoverUserIdentity() {
            if (!this.isStorageAvailable('localStorage')) {
                return;
            }
            let storedFirstName = localStorage.getItem('firstName');
            let storedLastName = localStorage.getItem('lastName');
            this.reservationForm.firstName.value = storedFirstName;
            this.reservationForm.lastName.value = storedLastName;
        }

        storeReservationDetails() {
            if (!this.isStorageAvailable('sessionStorage')) {
                return;
            }
            sessionStorage.setItem('stationAddress', this.stationAddress);
        }

        recoverReservationDetails() {
            if (!this.isStorageAvailable('sessionStorage')) {
                return;
            }
            if (!sessionStorage.getItem('stationAddress')) {
                return;
            }
            this.displayReservationDetails(sessionStorage.getItem('stationAddress'), true);
        }

        displayReservationDetails(stationAddress, shouldJustRefresh = false) {
            this.stationAddress = stationAddress;
            this.reservationDetailsRoot.innerHTML = '';
            this.reservationStatusDisplay = document.createElement('p');
            this.reservationStatusDisplay.innerHTML = 'Vélo réserver à la station ' + this.stationAddress + ' par ' + this.firstName + ' ' + this.lastName + '.<br/><br/>';
            this.reservationDetailsRoot.appendChild(this.reservationStatusDisplay);
            this.remainingTimeDisplay = document.createElement('p');
            this.reservationDetailsRoot.appendChild(this.remainingTimeDisplay)
            if (!shouldJustRefresh) {
                this.reservationDate = new Date();
                sessionStorage.setItem('reservationDate', this.reservationDate);
                this.storeReservationDetails();
            }
            this.startReservationTimer()
        }

        startReservationTimer() {
            const timer = function() {
                let timestamp = new Date();
                this.remainingTime = 1200 - ((timestamp - this.reservationDate) / 1000);
                if (this.remainingTime <= 0) {
                    this.remainingTimeDisplay.innerHTML = 'Temps restant : <span class="badge red white-text">Expirée</span>';
                    clearInterval(reservationTimer);
                    sessionStorage.clear();
                    return;
                }
                let remainingMinutes = Math.trunc(this.remainingTime/60);
                let remainingSecondes = Math.round(this.remainingTime%60);
                this.remainingTimeDisplay.innerHTML = 'Temps restant : ' + remainingMinutes + ' min ' + remainingSecondes + 's';
            }
            if (sessionStorage.getItem('reservationDate')) {
                this.reservationDate = new Date(sessionStorage.getItem('reservationDate'));
            }
            timer.bind(this);
            let reservationTimer = setInterval(timer.bind(this), 1000);
        }
    }

    window.Reservation = Reservation;
})(window, document);
