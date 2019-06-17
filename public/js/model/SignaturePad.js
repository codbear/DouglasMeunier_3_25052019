(function(window) {

    class SignaturePad {

        constructor(container, width, height, onValidation, lineWidth = '1.5') {
            this.canvas = container.querySelector('.sp-canvas');
            this.canvas.width = width;
            this.canvas.height = height;
            this.isSmallScreen = false;
            this.noSignatureSwitch = container.querySelector('.sp-no-signature-switch');
            this.noSignatureVersion = container.querySelector('.sp-no-signature-version');
            this.noSignatureVersionCheckbox = this.noSignatureVersion.querySelector('input')
            this.resetButton = container.querySelector('.sp-reset-btn');
            this.validationButton = container.querySelector('.sp-validation-btn');
            this.errorText = container.querySelector('.sp-error-txt');
            this.helper = container.querySelector('.sp-helper');
            this.ctx = this.canvas.getContext('2d');
            this.ctx.lineWidth = lineWidth;
            this.onWindowResize = this.onWindowResize.bind(this);
            this.onWindowResize();
            window.addEventListener('resize', this.onWindowResize);
            this.ctx.beginPath();
            this.initListeners();
        }

        setLineWidth(lineWidth) {
            if (lineWidth) {
                this.ctx.lineWidth = lineWidth;
            }
        }

        draw(event) {
            this.ctx.lineTo(event.layerX, event.layerY);
            this.ctx.stroke();
        }

        clearPad() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
        }

        isEmpty() {
            const pixelsMatrix = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
            const isPixelNull = function(pixelValue) {
                return pixelValue === 0;
            }
            return pixelsMatrix.every(isPixelNull);
        }

        displayErrorText() {
            this.errorText.style.visibility = 'visible';
            this.canvas.style.borderColor = 'red';
            this.helper.style.borderColor = 'red';
        }

        hideErrorText() {
            this.canvas.style.borderColor = 'black';
            this.errorText.style.visibility = 'hidden';
            this.helper.style.borderColor = '#2BBBAD';
        }

        initListeners() {
            const drawBound = this.draw.bind(this);
            this.canvas.addEventListener('mousedown', (e) => {
                this.hideErrorText();
                this.ctx.moveTo(e.layerX, e.layerY);
                this.canvas.addEventListener('mousemove', drawBound);
            });
            window.addEventListener('mouseup', () => {
                this.canvas.removeEventListener('mousemove', drawBound);
            })
            this.noSignatureSwitch.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.isNoSignatureVersion) {
                    this.useDefaultVersion();
                    this.noSignatureSwitch.textContent = 'Je ne peux pas signer';
                    return;
                }
                this.useNoSignatureVersion();
                this.noSignatureSwitch.textContent = 'Je peux signer';
            })
            this.noSignatureVersionCheckbox.addEventListener('change', (e) => {
                if (this.noSignatureVersionCheckbox.checked) {
                    this.hideErrorText();
                } else {
                    this.displayErrorText();
                }
            })
            this.resetButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearPad();
                this.displayErrorText();
            })
        }

        useNoSignatureVersion() {
            this.helper.textContent = 'Merci de cocher la case ci-dessous pour certifier l\'exactitude des données renseignées.';
            this.errorText.textContent = 'Cochez la case pour valider la réservation';
            this.canvas.style.display = 'none';
            this.resetButton.style.display = 'none';
            this.errorText.style.visibility = 'hidden';
            this.noSignatureVersion.style.removeProperty('display');
            this.isNoSignatureVersion = true;
        }

        useDefaultVersion() {
            this.helper.textContent = 'Merci de signer dans le cadre ci-dessous pour certifier l\'exactitude des données renseignées.'
            this.errorText.textContent = 'Vous devez signer pour valider la réservation';
            this.canvas.style.removeProperty('display');
            this.resetButton.style.removeProperty('display');
            this.errorText.style.visibility = 'hidden';
            this.noSignatureVersion.style.display = 'none';
            this.isNoSignatureVersion = false;
        }

        onValidation(callback) {
            this.validationButton.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.isNoSignatureVersion) {
                    if (this.noSignatureVersionCheckbox.checked) {
                        callback(e);
                        return;
                    }
                    this.displayErrorText();
                    return;
                }
                if (this.isEmpty()) {
                    this.displayErrorText();
                    return;
                }
                callback(e);
            })
        }

        onWindowResize() {
            const isSmallScreen = window.innerWidth < 992;
            if (isSmallScreen !== this.isSmallScreen) {
                this.isSmallScreen = isSmallScreen;
                if (this.isSmallScreen) {
                    this.useNoSignatureVersion();
                    this.helper.textContent = 'La signature n\'est pas disponible sur les mobiles et tablettes à l\'heure actuelle. Merci de cocher la case ci-dessous pour certifier l\'exactitude des données renseignées.';
                    this.noSignatureSwitch.style.display = 'none';
                    return;
                }
                this.useDefaultVersion();
                this.noSignatureSwitch.style.removeProperty('display');
            }
        }
    }

    window.SignaturePad = SignaturePad;
})(window)
