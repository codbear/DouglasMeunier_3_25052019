(function(window, document) {
    class Reservation {

        constructor(reservationForm) {
            this.reservationForm = reservationForm;
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

        displayReservationDetails(userContainer, stationAddress) {
            this.reservationDetailsRoot = userContainer;
            this.stationAddress = stationAddress.innerText;
            this.reservationDetailsRoot.innerHTML = '';
            this.reservationStatus = document.createElement('p');
            this.reservationStatus.textContent = 'Vélo réserver à la station ' + this.stationAddress + ' par ' + this.firstName + ' ' + this.lastName;
            this.reservationDetailsRoot.appendChild(this.reservationStatus);
            this.reservationDetailsRoot.appendChild(document.createElement('br'));
            this.reservationRemainingTime = document.createElement('p');
            this.reservationRemainingTime.textContent = 'Temps restant : ';
            this.reservationDetailsRoot.appendChild(this.reservationRemainingTime);
            this.storeReservationDetails();
        }
    }

    window.Reservation = Reservation;
})(window, document);
