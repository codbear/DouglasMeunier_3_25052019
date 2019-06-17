const $preloader = document.querySelector('#preloader');
const $siteContent = document.querySelector('#main');
const $stationsMap = document.querySelector('#stations-map');
const $stationDetailsContainer = document.querySelector('#station-details-container');
const $reservationForm = document.querySelector('#reservation-form');
const $bookBtn = document.querySelector('#book-btn');
const $signaturePadContainer = document.querySelector('#modal-signature-pad');
const $reservationStatus = document.querySelector('#reservation-status');

const welcomeSlider = new window.Slider(document.querySelector('#welcome-slider'), true);
const stationDetails = new window.StationDetails($stationDetailsContainer);
const reservation = new window.Reservation($stationDetailsContainer, $reservationForm, $bookBtn, $reservationStatus);
const modalSignaturePad = new window.ModalBox($bookBtn);
const signaturePad = new window.SignaturePad($signaturePadContainer, 464, 400);

const initMap = async function() {
    const map = new window.LeafletMap('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.');
    await map.loadMap($stationsMap);
    const requestStationsList = new window.Request('https://api.jcdecaux.com/vls/v1/stations')
    requestStationsList.setParams({
        'contract': 'nantes',
        'apiKey': '3ce01edd3b8a04bb2a11192cf0fc8d3075b204cc'
    })
    requestStationsList.execute((parsedDatas) => {
        const stationsList = parsedDatas;
        stationsList.forEach((station) => {
            function onClick() {
                stationDetails.displayDetails(station);
                reservation.displayReservationForm();
                window.scrollTo(0, $stationDetailsContainer.offsetTop);
            }
            switch (station.status) {
                case 'CLOSED':
                    map.addMarker(station.position.lat, station.position.lng, station.address, onClick, 'public/img/red_marker_icon.png');
                    break;
                default :
                    map.addMarker(station.position.lat, station.position.lng, station.address, onClick);
            }
        })
        map.centerOnMarkers();
    }, (status, statusText) => {
        $stationsMap.innerHTML = '<p>Une erreur s\'est produite lors du chargement de la carte</p>';
        console.error(status + ' ' + statusText);
    })
}

if ($stationsMap !== null) {
    initMap();
}
reservation.onBooking(stationDetails, (e) => {
    modalSignaturePad.openBox(e);
})
signaturePad.onValidation((e) => {
    modalSignaturePad.closeBox(e);
    reservation.displayReservationDetails(stationDetails.address.innerHTML);
    stationDetails.hideDetails();
    reservation.hideReservationForm();
    reservation.displayConfirmationMessage();
})

$preloader.style.display = 'none';
$siteContent.style.removeProperty('display');
