(function(window, document) {
    class Request {

        constructor(url, userOptions = {}) {
            this.xhr = new XMLHttpRequest();
            this.url = url;
            this.options = Object.assign({}, {
                method: 'GET',
                async: true
            }, userOptions)
        }

        setUrl(url) {
            if (url) {
                this.url = url;
            }
        }
    }

    window.Request = Request;
})(window, document)
