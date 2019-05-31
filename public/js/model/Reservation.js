(function(window, document) {
    class Reservation {

        constructor(reservationForm) {
            this.reservationForm = reservationForm;
        }

        serializeIdentity() {
            return {firstName: this.reservationForm.firstName.value,
                    lastName: this.reservationForm.lastName.value}
        }
    }

    window.Reservation = Reservation;
})(window, document);
