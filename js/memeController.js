'use strict'

var gElCanvas
var gCtx
var gOtherImage = null
var gDraggedLine = null
var gMouseDownPos = {}


function renderMeme(showSelectBorder=true, onRenderDone=null) {

    const meme = getMeme()

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    const imageSrc = (gOtherImage)?  gOtherImage.src : `img/meme-imgs-square/${meme.selectedImgId}.jpg`

    const selectedLine = (meme.lines[meme.selectedLineIdx])? meme.lines[meme.selectedLineIdx] : meme.lines[0]

    const image = new Image()

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

            if(selectedLine && line.id === selectedLine.id && showSelectBorder) {
                drawSelectedLine(txt, size, x, y)
            }
        })
        if(onRenderDone){
            onRenderDone()
        }
    }
    image.src = imageSrc
}

function drawSelectedLine(txt, size, x, y){

    var textWidth = gCtx.measureText(txt).width
    var textHeight = size

    // padding = 8
    var borderWidth = textWidth + 8
    var borderHeight = textHeight + 8

    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x - borderWidth / 2, y - borderHeight + 8, borderWidth, borderHeight);
    gCtx.strokeStyle = 'white'
    gCtx.strokeRect(x - borderWidth / 2 + 1, y - borderHeight + 9, borderWidth - 2, borderHeight - 2);

    setLineDimensions(x, y, borderWidth, borderHeight)
}

function onDownloadCanvas(event) {

    event.preventDefault()

    renderMeme(false, () => {

        const data = gElCanvas.toDataURL('image/jpeg')

        var link = document.createElement('a')

        link.href = data
        link.download = 'my-canvas.jpg'

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    })
}

function onAddImage(ev) {
    loadImageFromInput(ev, function (img) {
        gOtherImage = img
        renderMeme()
    })
}

function onUploadCanvas() {
    renderMeme(false)

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
    const newLineId = addNewLine('Your Text Here')
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


function onRandomMeme() {
    onClearCanvas()
    createRandomMeme()
    setImg(getRandomInt(1, 18))
    renderMeme(false)
}

function updateInputText(meme) {
    document.getElementById('text-input').value = meme.lines[meme.selectedLineIdx].txt
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onMouseDown)
    gElCanvas.addEventListener('mousemove', onMouseMove)
    gElCanvas.addEventListener('mouseup', onMouseUp)
}

function onMouseDown(event) {
    gElCanvas.style.cursor = 'grabbing'

    const offsetX = event.offsetX
    const offsetY = event.offsetY

    const meme = getMeme()
    for (var i = 0; i < meme.lines.length; i++) {
        const line = meme.lines[i];
        if (
        offsetX > line.x - line.width / 2 &&
        offsetX < line.x + line.width / 2 &&
        offsetY > line.y - line.height &&
        offsetY < line.y + 12
        ) {
        gDraggedLine = line
        gMouseDownPos = { x: offsetX, y: offsetY }
        setSelectedLineIdx(i)
        updateInputText(getMeme())
        renderMeme()
        return
        }
    }
}

function onMouseMove(event) {
    if (gDraggedLine) {
        const offsetX = event.offsetX
        const offsetY = event.offsetY

        const dx = offsetX - gMouseDownPos.x
        const dy = offsetY - gMouseDownPos.y
        gMouseDownPos = { x: offsetX, y: offsetY }
        gDraggedLine.x += dx
        gDraggedLine.y += dy

        renderMeme()
    }
}

function onMouseUp(event) {
    gDraggedLine = null
    gElCanvas.style.cursor = 'default'
}

function resetOtherImg() {
    gOtherImage = null
}

function onChangePage(change) {
    changePage(change)
    renderEmojiLine()
}

function onClickEmoji(txt) {
    addNewLine(txt)
    renderMeme()
}

function renderEmojiLine() {
    const emojis = getEmojis()
    var strHtmls = emojis.map(emoji => `
        <td onclick="onClickEmoji('${emoji.txt}')">${emoji.txt}</td>
    `)
    document.querySelector('tbody tr').innerHTML = strHtmls.join('')
}

function onSaveMeme() {
    showModal()
    saveMeme()
}

function showModal() {
    var modal = document.querySelector('.save-modal-container');
    modal.style.bottom = "0"
    setTimeout(function() {
      modal.style.bottom = "-100px"
    }, 2000)
}