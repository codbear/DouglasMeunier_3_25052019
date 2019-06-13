(function(window) {
    class LeafletMarker {

        constructor(map, bound, title, onClick, iconUrl) {
            this.useDefaultIcon = true;
            if (iconUrl) {
                this.setIcon(iconUrl);
                this.useDefaultIcon = false;
            }
            this.createMarker(map, bound, title, onClick)
        }

        setIcon(iconUrl) {
            this.icon = L.icon({
                iconUrl: iconUrl,
                shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
                iconSize:     [40, 40],
                shadowSize:   [40, 40],
                iconAnchor:   [20, 40],
                shadowAnchor: [12, 40],
                popupAnchor:  [-3, -76]
            })
        }

        getIcon() {
            return this.icon;
        }

        createMarker(map, bound, title, onClick) {
            if (this.useDefaultIcon) {
                if (onClick) {
                    this.marker = L.marker(bound, {title: title}).addTo(map).on('click', onClick);
                } else {
                    this.marker = L.marker(bound, {title: title}).addTo(map)
                }
            } else {
                if (onClick) {
                    this.marker = L.marker(bound, {icon: this.getIcon(), title: title}).addTo(map).on('click', onClick);
                } else {
                    this.marker = L.marker(bound, {icon: this.getIcon(), title: title}).addTo(map)
                }
            }
        }
    }

    window.LeafletMarker = LeafletMarker;
})(window)
