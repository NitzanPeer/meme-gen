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

    const selectedLine = (meme.lines[meme.selectedLineIdx])? meme.lines[meme.selectedLineIdx] : meme.lines[0]

    const image = new Image()
    image.src = imageSrc
    image.onload = function () {
        gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line) => {
            const { txt, size, font, color, textAlign } = line
            gCtx.fillStyle = color;
            gCtx.font = `${parseInt(size)}px ${font}`
            gCtx.textAlign = textAlign
            gCtx.strokeStyle = 'black'
            gCtx.lineJoin = 'round';
            gCtx.lineWidth = 8
            gCtx.strokeText(txt, gElCanvas.width / 2, 50)
            gCtx.fillText(txt, gElCanvas.width / 2, 50)
            console.log('line', line)
            console.log('selectedLine', selectedLine)

            if(line.id === selectedLine.id) {
                var textWidth = gCtx.measureText(txt).width
                // console.log('gCtx.measureText(txt)', gCtx.measureText(txt))
                var textHeight = size
                var borderX = gElCanvas.width / 2
                var borderY = 15
                var borderWidth = textWidth + 2 * 2
                var borderHeight = textHeight + 2 * 2
                gCtx.lineWidth = 2
                gCtx.strokeRect(borderX, borderY, borderWidth, borderHeight)
            }
        })
    }
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
    removeAllLines()
    renderMeme()
}

function hideMeme() {
    hideElement('.meme-section')
}
function showMeme() {
    showElement('.meme-section')
}

function onUpdateText(text) {
    if(!getMeme().lines.length) return
    setLineTxt(text)
    renderMeme()
}

function onChangeSize(isIncrease) {
    if(!getMeme().lines.length) return
    changeSize(isIncrease)
    renderMeme()
}

function onChangeColor() {
    if(!getMeme().lines.length) return
    var color = document.querySelector('.change-fontclr-btn').value
    setColor(color)
    renderMeme()
}

function onChangeFont() {
    if(!getMeme().lines.length) return
    const font = document.getElementById('font-dropDown').value
    setFont(font)
    renderMeme()
}

function onChangeAlign() {
    if(!getMeme().lines.length) return
    const align = document.getElementById('align-dropDown').value
    setTextAlign(align)
    renderMeme()
}

function onAddNewLine() {
    const newLineId = addNewLine()
    setSelectedLineById(newLineId)
    document.getElementById('input-text').value = meme.lines[meme.selectedLineIdx].txt
    renderMeme()
}

function onRemoveLine() {
    removeSelectedLine()
    renderMeme()
}

function onSwitchLine() {
    const meme = getMeme()
    console.log('meme', meme)
    setNextSelectedLine()
    meme.selectedLineIdx
    document.getElementById('input-text').value = meme.lines[meme.selectedLineIdx].txt
    renderMeme()
}

