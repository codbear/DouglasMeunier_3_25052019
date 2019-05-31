document.addEventListener('DOMContentLoaded', function (){
    let welcomeSlider = new window.Slider(document.querySelector('#welcome-slider'));

    const stationsMap = document.querySelector('#stations-map');
    const reservationForm = document.querySelector('#reservation-form');
    const callToAction = document.querySelector('#call-to-action');
    const initMap = async function() {
        let map = new window.LeafletMap('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.');
        await map.loadMap(stationsMap);
        let requestStationsList = new window.Request('https://api.jcdecaux.com/vls/v1/stations')
        requestStationsList.setParams({
            'contract': 'nantes',
            'apiKey': '3ce01edd3b8a04bb2a11192cf0fc8d3075b204cc'
        })
        requestStationsList.execute(function(parsedDatas) {
            let stationsList = parsedDatas;
            let stationDetails = new window.StationDetails(document.querySelector('#station-details'));
            stationsList.forEach((station) => {
                function onClick() {
                    callToAction.style.display = 'none';
                    stationDetails.setDetails(station);
                    stationDetails.createHtmlStructure();
                    reservationForm.style.display = null;
                }
                let marker = map.addMarker(station.position.lat, station.position.lng, station.address, onClick);
            })
            map.centerOnMarkers();
        }, function(status, statusText) {
            console.error(status + statusText);
        })
    }
    if (stationsMap !== null) {
        initMap();
    }

    const bookBtn = document.querySelector('#reservation-form-book-btn');
    const modalSignaturePad = new window.ModalBox(bookBtn);
    const signaturePad = new window.SignaturePad(document.querySelector('#signature-pad-canvas'), 450, 400);
    bookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (reservationForm.lastName.value !== "" && reservationForm.firstName.value !== "") {
            modalSignaturePad.openBox(e);
        }
    })
})
