(function(window, document) {
    class Reservation {

        constructor(stationDetailsContainer, reservationForm, bookBtn, reservationDetailsRoot) {
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
            this.reservationForm.style.display = null;
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

        onBooking(callback) {
            this.bookBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.reservationForm.firstName.value !== "" && this.reservationForm.firstName.value !== "") {
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
                this.reservationDate = new Date(sessionStorage.getItem('reservationDate'));
            }
            let reservationTimer = setInterval(timer.bind(this), 1000);
        }

        displayConfirmationMessage() {
            this.confirmationMessage.style.display = null;
            setTimeout(this.hideConfirmationMessage.bind(this), 2000);
        }

        hideConfirmationMessage() {
            this.confirmationMessage.style.display = 'none';
            this.callToAction.style.display = null;
        }
    }

    window.Reservation = Reservation;
})(window, document);
