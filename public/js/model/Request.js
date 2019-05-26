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

        setParams(params) {
            for (let param in params) {
                if (this.url.indexOf('?') !== -1) {
                    this.url += '&';
                } else {
                    this.url += '?';
                }
                this.url += encodeURIComponent(param) + '=' + encodeURIComponent(params[param]);
            }
        }

        setPostDatas(postDatas, isJson = false) {
            if (!postDatas) {
                return
            }
            if (isJson) {
                this.xhr.setRequestHeader('Content-Type', 'application/json');
                this.postDatas = JSON.stringify(postDatas);
            } else {
                this.postDatas = new FormData(postDatas);
            }
        }
    }

    window.Request = Request;
})(window, document)
