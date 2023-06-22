'use strict'

var gElCanvas
var gCtx
var gUserImage = null


function renderMeme() {

    const meme = getMeme()

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    const imageSrc = (gUserImage)?  gUserImage.src : `img/meme-imgs-square/${meme.selectedImgId}.jpg`

    gUserImage = null

    const selectedLine = (meme.lines[meme.selectedLineIdx])? meme.lines[meme.selectedLineIdx] : meme.lines[0]

    const image = new Image()
    image.src = imageSrc
    image.onload = function () {
        gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line) => {
            const { txt, size, font, color, textAlign } = line
            gCtx.fillStyle = color
            gCtx.font = `${parseInt(size)}px ${font}`
            gCtx.textAlign = textAlign
            gCtx.strokeStyle = 'black'
            gCtx.lineJoin = 'round'
            gCtx.lineWidth = 8
            gCtx.strokeText(txt, gElCanvas.width / 2, 50)
            gCtx.fillText(txt, gElCanvas.width / 2, 50)

            if(line.id === selectedLine.id) {
                drawSelectedLine(txt, size)
            }
        })
    }

}

function drawSelectedLine(txt, size){
    var textWidth = gCtx.measureText(txt).width
    var textHeight = size

    var borderWidth = textWidth + 2 * 2
    var borderHeight = textHeight + 4 * 2

    var borderX = generateSelectedLineXPosition(borderWidth)
    var borderY = 50 - gCtx.measureText(txt).fontBoundingBoxAscent

    gCtx.lineWidth = 2
    gCtx.strokeRect(borderX, borderY, borderWidth, borderHeight)

    //save dimensions for onLineClick select:
    setLineDimensions(borderX, borderY, borderWidth, borderHeight)
}

function generateSelectedLineXPosition(borderWidth){
    return (gElCanvas.width / 2) - (borderWidth / 2)
}


function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-canvas.jpg'
}

function onAddImage(ev) {
    loadImageFromInput(ev, function (img) {
        gUserImage = img
        // setImage(img)
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
    const meme = getMeme()
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
    setNextSelectedLine()
    meme.selectedLineIdx
    document.getElementById('input-text').value = meme.lines[meme.selectedLineIdx].txt
    renderMeme()
}

function onClickOnCanvas(ev) {
    console.log(ev)

    const offsetX = ev.offsetX
    const offsetY = ev.offsetY

    for (let i = 0; i < gMeme.lines.length; i++) {
        const line = gMeme.lines[i];
        if (offsetX >= line.x && offsetX <= line.x + line.width
            && offsetY >= line.y && offsetY <= line.y + line.height)
        {
            setSelectedLineIdx(i)
            renderMeme()
        }
    }
}