(function(window, document) {
    class LeafletMap {

        constructor(tileLayer, attribution) {
            this.map = null;
            this.tileLayer = tileLayer;
            this.attribution = attribution;
            this.bounds = [];
        }

        loadMap(userContainer) {
            return new Promise((resolve, reject) => {
                window.$script('https://unpkg.com/leaflet@1.4.0/dist/leaflet.js', () => {
                    this.map = L.map(userContainer);
                    L.tileLayer(this.tileLayer, {
                        attribution: '© ' + this.attribution
                    }).addTo(this.map);
                    resolve();
                })
            })
        }

        addMarker(lat, lng, title, onClick = undefined) {
            const bound = [lat, lng];
            this.bounds.push(bound);
            return new window.LeafletMarker(this.map, bound, title, onClick);
        }

    }

    window.LeafletMap = LeafletMap;
})(window, document)
