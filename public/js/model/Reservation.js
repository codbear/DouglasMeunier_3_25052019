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

        displayReservationDetails(stationAddress, shouldRefresh = false) {
            this.stationAddress = stationAddress;
            this.reservationDetailsRoot.innerHTML = '';
            this.reservationStatusDisplay = document.createElement('p');
            this.reservationStatusDisplay.innerHTML = 'Vélo réserver à la station ' + this.stationAddress + ' par ' + this.firstName + ' ' + this.lastName + '.<br/><br/>';
            this.reservationDetailsRoot.appendChild(this.reservationStatusDisplay);
            this.remainingTimeDisplay = document.createElement('p');
            this.reservationDetailsRoot.appendChild(this.remainingTimeDisplay)
            this.startReservationTimer()
            if (!shouldRefresh) this.storeReservationDetails();
        }

        startReservationTimer() {
            if (sessionStorage.getItem('remainingTime')) {
                this.remainingTime = sessionStorage.getItem('remainingTime');
            } else {
                this.remainingTime = 1200;
            }
            const timer = function() {
                if (this.remainingTime <= 0) {
                    this.remainingTimeDisplay.innerHTML = 'Temps restant : <span class="badge red white-text">Expirée</span>';
                    clearInterval(reservationTimer);
                    sessionStorage.clear();
                    return;
                }
                this.remainingTime -= 1;
                sessionStorage.setItem('remainingTime', this.remainingTime);
                let remainingMinutes = Math.trunc(this.remainingTime/60);
                let remainingSecondes = this.remainingTime%60;
                this.remainingTimeDisplay.innerHTML = 'Temps restant : ' + remainingMinutes + ' min ' + remainingSecondes + 's';
            }
            let reservationTimer = setInterval(timer.bind(this), 1000);
        }
    }

    window.Reservation = Reservation;
})(window, document);
