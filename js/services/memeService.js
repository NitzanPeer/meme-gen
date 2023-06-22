'use strict'


var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat']}]

var gMeme = {
    selectedImgId: 5,
    selectedImg: null,
    selectedLineIdx: 0,
    lines: [
        {
            id: makeId(),
            txt: 'I sometimes eat Falafel',
            size: 36,
            font: 'Impact',
            color: 'white',
            textAlign: 'center',
            x: null,
            y: null,
            width: null,
            height: null
        },
        {
            id: makeId(),
            txt: 'Hello World',
            size: 45,
            font: 'Arial',
            color: 'white',
            textAlign: 'center',
            x: 50,
            y: 40,
            width: null,
            height: null
        }
    ]
}


var gImages = [
    _createImage(1),
    _createImage(2),
    _createImage(3),
    _createImage(4),
    _createImage(5),
    _createImage(6),
    _createImage(7),
    _createImage(8),
    _createImage(9),
    _createImage(10),
    _createImage(11),
    _createImage(12),
    _createImage(13),
    _createImage(14),
    _createImage(15),
    _createImage(16),
    _createImage(17),
    _createImage(18)
]


var gRandomMemes = []
var gFonts = []


function getMeme() {
    return gMeme
}

function getImages() {
    return gImages
}

function getImageById(imgId) {
    gImages.find(image => imgId === image.id)
}

function _createImage(imgId) {
    var imgUrl = `img/meme-imgs-square/${imgId}.jpg`
    return {
        id: imgId,
        imgUrl
    }
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}
function setSize(size) {
    gMeme.lines[gMeme.selectedLineIdx].size = size
}
function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}
function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}
function strokeStyle(strokeStyle) {
    gMeme.lines[gMeme.selectedLineIdx].strokeStyle = strokeStyle
}
function setTextAlign(textAlign) {
    gMeme.lines[gMeme.selectedLineIdx].textAlign = textAlign
}
function setSelectedLineIdx(selectedLineIdx){
    gMeme.selectedLineIdx = selectedLineIdx
}



function changeSize(isIncrease) {
    var size = gMeme.lines[gMeme.selectedLineIdx].size
    size = (isIncrease)? size + 4 : size - 4
    setSize(size)
}


function setSelectedLineById(lineId) {
    const lineIdx = gMeme.lines.findIndex(line => lineId === line.id)
    setSelectedLineIdx(lineIdx)
}

function setNextSelectedLine(){
    console.log('gMeme', gMeme)
    console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx)
    const lineIdx = (gMeme.selectedLineIdx <= gMeme.lines.length-1) ? gMeme.selectedLineIdx + 1 : 0
    setSelectedLineIdx(lineIdx)
}

function getLineById(lineId) {
    return gMeme.lines.find(line => lineId === line.id)
}

function addNewLine() {
    const id = makeId()
    gMeme.lines.push(
        {
            id: id,
            txt: 'Your Text Here',
            size: 50,
            font: 'Impact',
            color: 'white',
            textAlign: 'center'
        }
    )
    return id
}

function removeAllLines() {
    gMeme.lines = []
}

function removeSelectedLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--
}

function setLineDimensions(x, y, width, height) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.x = x
    line.y = y
    line.width = width
    line.height = height
}

// A Feature (in progress)
function createRandomLineProperties() {
    return {
        id: makeId(),
        txt: 'Random Text',
        size: getRandomInt(20, 50),
        font: 'Impact',
        color: getRandomColor(),
        textAlign: 'center'
    }
}
