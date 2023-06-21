'use strict'

var gElCanvas
var gCtx



function renderMeme(meme) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    const imageSrc = meme.imgURL;
    const text = 'Your Text Here'

    gCtx.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = imageSrc;
    image.onload = function () {

        gCtx.drawImage(image, 0, 0, canvas.width, canvas.height);

        gCtx.fillStyle = 'white';
        gCtx.font = '36px Arial';
        gCtx.textAlign = 'center';
        gCtx.fillText(text, canvas.width / 2, 50);
    }
}