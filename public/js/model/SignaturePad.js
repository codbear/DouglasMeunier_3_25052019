(function(window) {

    class SignaturePad {

        constructor(canvasElement, width, height, lineWidth = '1.5') {
            this.canvas = canvasElement;
            this.canvas.width = width;
            this.canvas.height = height;
            this.ctx = this.canvas.getContext('2d');
            this.ctx.lineWidth = lineWidth;
            this.ctx.beginPath();
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
    }

    window.SignaturePad = SignaturePad;
})(window)
