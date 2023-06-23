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
            const { txt, size, font, color, textAlign, x, y} = line
            gCtx.fillStyle = color
            gCtx.font = `${parseInt(size)}px ${font}`
            gCtx.textAlign = textAlign
            gCtx.strokeStyle = 'black'
            gCtx.lineJoin = 'round'
            gCtx.lineWidth = 8

            gCtx.strokeText(txt, x, y)
            gCtx.fillText(txt, x, y)

            if(line.id === selectedLine.id) {
                drawSelectedLine(txt, size, x, y)
            }
        })
    }
}

function drawSelectedLine(txt, size, x, y){
    var textWidth = gCtx.measureText(txt).width
    var textHeight = size

    // padding = 8
    var borderWidth = textWidth + 8
    var borderHeight = textHeight + 8

    var borderX = generateSelectedLineXPosition(borderWidth)
    var borderY = 50 - gCtx.measureText(txt).fontBoundingBoxAscent

    gCtx.lineWidth = 2
    gCtx.strokeRect(borderX, y-35, borderWidth, borderHeight)

    //save dimensions for onLineClick select:
    setLineDimensions(x, y, borderWidth, borderHeight)
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
    const color = document.querySelector('.change-fontclr-input').value
    setColor(color)
    renderMeme()
}

function onChangeFont() {
    if(!getMeme().lines.length) return
    const font = document.getElementById('font-dropdown').value
    setFont(font)
    renderMeme()
}

function onChangeAlign() {
    if(!getMeme().lines.length) return
    const align = document.getElementById('align-dropdown').value
    setTextAlign(align)
    renderMeme()
}

function onAddNewLine() {
    const meme = getMeme()
    const newLineId = addNewLine()
    setSelectedLineById(newLineId)
    updateInputText(meme)
    renderMeme()
}

function onRemoveLine() {
    removeSelectedLine()
    renderMeme()
}

function onSwitchLine() {
    const meme = getMeme()
    if(!meme.lines.length) return
    setNextSelectedLine()
    meme.selectedLineIdx
    updateInputText(meme)
    renderMeme()
}

function onClickOnCanvas( { offsetX, offsetY }) {
    console.log('offsetX', offsetX)
    console.log('offsetY', offsetY)
    console.log('gMeme.lines', gMeme.lines)

    const meme = getMeme()

    // const offsetX = ev.offsetX
    // const offsetY = ev.offsetY

    for (var i = 0; i < meme.lines.length; i++) {
        const line = meme.lines[i];
        if (
            offsetX > (line.x - (line.width / 2)) &&
            offsetX < (line.x + (line.width / 2)) &&
            offsetY > (line.y - line.height) &&
            offsetY < (line.y + 12)
            )
        {
            setSelectedLineIdx(i)
            updateInputText(getMeme())
            renderMeme()
            return
        }
    }
}

function onRandomMeme() {
    createRandomMeme()
    setImg(getRandomInt(1, 18))
    renderMeme()
}


function updateInputText(meme) {
    document.getElementById('text-input').value = meme.lines[meme.selectedLineIdx].txt
}