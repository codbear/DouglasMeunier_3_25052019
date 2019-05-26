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

        setMethod(method) {
            method = method.toUpperCase();
            const authoMethods = ['GET', 'POST', 'PUT', 'DELETE'];
            if (authoMethods.contains(method)) {
                this.options.method = method;
            }
        }
    }

    window.Request = Request;
})(window, document)
