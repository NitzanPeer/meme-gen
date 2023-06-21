'use strict'

var gElCanvas
var gCtx

var gUserImage = null


// renderMeme()


function renderMeme() {

    const meme = getMeme()

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    const imageSrc = (gUserImage)?  gUserImage.src : `img/meme-imgs-square/${meme.selectedImgId}.jpg`
    const text = meme.lines[gMeme.selectedLineIdx].txt

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);

    const image = new Image();
    image.src = imageSrc;
    image.onload = function () {

        gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height);

        gCtx.fillStyle = 'white';
        gCtx.font = '36px Arial';
        gCtx.textAlign = 'center';
        gCtx.fillText(text, gElCanvas.width / 2, 50);
    }
}

function onUpdateText(text) {
    setLineTxt(text)
    renderMeme()
}

function onSaveCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-canvas.jpg'
}

// function onAddImage(ev) {
//     loadImageFromInput(ev, renderMeme)
// }

function onAddImage(ev) {
    loadImageFromInput(ev, function (img) {
        gUserImage = img
        renderMeme()
    })
}

function onUploadCanvas() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    doUploadImg(imgDataUrl, onSuccess)
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

