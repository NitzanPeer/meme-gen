'use strict'

var gElCanvas
var gCtx
var gUserImage = null


// var gMeme = {
//     selectedImgId: 5, selectedLineIdx: 0,
//     lines: [
//         {
//             txt: 'I sometimes eat Falafel',
//             size: 36,
//             font: 'Impact',
//             color: 'white',
//             textAlign: 'center'
//         },
//         {
//             txt: 'Hello World',
//             size: 45,
//             font: 'Arial',
//             color: 'white',
//             textAlign: 'center'
//         }
//     ]
// }



function renderMeme() {

    const meme = getMeme()

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    const imageSrc = (gUserImage)?  gUserImage.src : `img/meme-imgs-square/${meme.selectedImgId}.jpg`

    const selectedLine = meme.lines[gMeme.selectedLineIdx]

    const image = new Image()
    image.src = imageSrc
    image.onload = function () {
        gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line) => {
            const { txt, size, font, color, textAlign } = line
            gCtx.fillStyle = color;
            gCtx.font = `${parseInt(size)}px ${font}`
            gCtx.textAlign = textAlign
            gCtx.strokeStyle = line.strokeStyle
            gCtx.lineWidth = 8
            gCtx.strokeText(txt, gElCanvas.width / 2, 50)
            gCtx.fillText(txt, gElCanvas.width / 2, 50)
        })
    }
}

function onUpdateText(text) {
    setLineTxt(text)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-canvas.jpg'
}

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
    removeLines()
    renderMeme()
}

function hideMeme() {
    hideElement('.meme-section')
}
function showMeme() {
    showElement('.meme-section')
}

function onChangeSize(isIncrease) {
    const meme = getMeme()
    var size = meme.lines[gMeme.selectedLineIdx].size
    size = (isIncrease)? size+4 : size-4
    setSize(size)
    renderMeme()
}

function onChangeColor() {
    var color = document.querySelector('.change-fontclr-btn').value
    setColor(color)
    renderMeme()
}

function onChangeFont() {
    const font = document.getElementById('font-dropDown').value
    setFont(font)
    renderMeme()
}

function onChangeAlign() {
    const align = document.getElementById('align-dropDown').value
    setTextAlign(align)
    renderMeme()
}

function onAddNewLine() {
    addNewLine()
    renderMeme()
}