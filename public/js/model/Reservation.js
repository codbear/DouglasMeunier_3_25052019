(function(window, document) {
    class Reservation {

        constructor(stationDetailsContainer, reservationForm, bookBtn, reservationDetailsRoot) {
            this.stationDetails = stationDetailsContainer.querySelector('#station-details');
            this.confirmationMessage = stationDetailsContainer.querySelector('.confirmation-message');
            this.callToAction = stationDetailsContainer.querySelector('.call-to-action');
            this.reservationForm = reservationForm;
            this.bookBtn = bookBtn;
            this.reservationDetailsRoot = reservationDetailsRoot;
            this.recoverUserIdentity();
            this.recoverReservationDetails();
            this.toggleBookButtonState();
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
            if (localStorage.getItem('firstName')) {
                let storedFirstName = localStorage.getItem('firstName');
                this.firstName = storedFirstName;
                this.reservationForm.firstName.value = storedFirstName;
            }
            if (localStorage.getItem('lastName')) {
                let storedLastName = localStorage.getItem('lastName');
                this.lastName = storedLastName;
                this.reservationForm.lastName.value = storedLastName;
            }
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
            if (sessionStorage.getItem('stationAddress')) {
                this.displayReservationDetails(sessionStorage.getItem('stationAddress'), true);
            }
        }

        displayReservationForm() {
            this.reservationForm.style.removeProperty('display');
        }

        hideReservationForm() {
            this.reservationForm.style.display = 'none';
        }

        toggleBookButtonState() {
            if (this.firstName !== "" && this.lastName !== "") {
                this.bookBtn.disabled = false;
            }
            this.reservationForm.addEventListener('input', (e) => {
                if (this.reservationForm.firstName.value !== "" && this.reservationForm.firstName.value !== "") {
                    this.bookBtn.disabled = false;
                } else {
                    this.bookBtn.disabled = true;
                }
            })
        }

        onBooking(stationDetails, callback) {
            this.bookBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.stationStatus = this.stationDetails.dataset.status;
                this.availableBikes = this.stationDetails.dataset.availableBikes;
                if (this.reservationForm.firstName.value !== ''
                    && this.reservationForm.lastName.value !== ''
                    && this.stationStatus === 'open'
                    && this.availableBikes >= 1) {
                    callback(e);
                }
            })
        }

        displayReservationDetails(stationAddress, shouldJustRefresh = false) {
            this.firstName = this.reservationForm.firstName.value;
            this.lastName = this.reservationForm.lastName.value;
            this.storeUserIdentity();
            this.stationAddress = stationAddress;
            this.reservationDetailsRoot.innerHTML = '';
            this.reservationStatusDisplay = document.createElement('p');
            this.reservationStatusDisplay.innerHTML = 'Vélo réservé à la station ' + this.stationAddress + ' par ' + this.firstName + ' ' + this.lastName + '.<br/><br/>';
            this.reservationDetailsRoot.appendChild(this.reservationStatusDisplay);
            this.remainingTimeDisplay = document.createElement('p');
            this.reservationDetailsRoot.appendChild(this.remainingTimeDisplay)
            if (!shouldJustRefresh) {
                this.reservationDate = new Date().getTime() /1000;
                sessionStorage.setItem('reservationDate', this.reservationDate);
                this.storeReservationDetails();
            }
            this.startReservationTimer()
        }

        startReservationTimer() {
            const timer = function() {
                const timestamp = new Date().getTime() / 1000;
                this.remainingTime = 1200 - (timestamp - this.reservationDate);
                if (this.remainingTime <= 0) {
                    this.remainingTimeDisplay.innerHTML = '<span class="badge red white-text">Expirée</span>';
                    clearInterval(reservationTimer);
                    sessionStorage.clear();
                    return;
                }
                let remainingMinutes = Math.trunc(this.remainingTime/60);
                let remainingSecondes = Math.round(this.remainingTime%60);
                this.remainingTimeDisplay.innerHTML = 'Temps restant : ' + remainingMinutes + ' min ' + remainingSecondes + ' s';
            }
            if (sessionStorage.getItem('reservationDate')) {
                this.reservationDate = sessionStorage.getItem('reservationDate');
            }
            let reservationTimer = setInterval(timer.bind(this), 1000);
        }

        displayConfirmationMessage() {
            this.confirmationMessage.style.removeProperty('display');
            setTimeout(this.hideConfirmationMessage.bind(this), 2000);
        }

        hideConfirmationMessage() {
            this.confirmationMessage.style.display = 'none';
            this.callToAction.style.removeProperty('display');
        }
    }

    window.Reservation = Reservation;
})(window, document);
