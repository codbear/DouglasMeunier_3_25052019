(function(window, document) {
    class Reservation {

        constructor(reservationForm) {
            this.reservationForm = reservationForm;
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
            localStorage.setItem('firstName', this.reservationForm.firstName.value);
            localStorage.setItem('lastName', this.reservationForm.lastName.value);
        }
    }

    window.Reservation = Reservation;
})(window, document);
