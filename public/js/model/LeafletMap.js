(function(window, document) {
    class LeafletMap {

        constructor(tileLayer, attribution) {
            this.tileLayer = tileLayer;
            this.attribution = attribution;
        }

    }

    window.LeafletMap = LeafletMap;
})(window, document)
