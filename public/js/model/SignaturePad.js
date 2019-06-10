(function(window) {

    class SignaturePad {

        constructor(canvasElement, width, height, resetButton, errorText, lineWidth = '1.5') {
            this.canvas = canvasElement;
            this.canvas.width = width;
            this.canvas.height = height;
            this.resetButton = resetButton;
            this.errorText = errorText;
            this.ctx = this.canvas.getContext('2d');
            this.ctx.lineWidth = lineWidth;
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
        }

        initListeners() {
            const drawBound = this.draw.bind(this);
            this.canvas.addEventListener('mousedown', (e) => {
                this.canvas.style.borderColor = 'black';
                this.errorText.style.visibility = 'hidden';
                this.ctx.moveTo(e.layerX, e.layerY);
                this.canvas.addEventListener('mousemove', drawBound);
            });
            window.addEventListener('mouseup', () => {
                this.canvas.removeEventListener('mousemove', drawBound);
            })
            this.resetButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearPad();
            })
        }
    }

    window.SignaturePad = SignaturePad;
})(window)
