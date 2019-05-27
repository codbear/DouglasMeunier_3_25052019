(function(window) {
    class LeafletMarker {

        constructor(map, bound, title, onClick) {
            if (onClick) {
                this.marker = L.marker(bound, {title: title}).addTo(map).on('click', onClick);
            } else {
                this.marker = L.marker(bound, {title: title}).addTo(map)
            }
        }
    }

    window.LeafletMarker = LeafletMarker;
})(window)
