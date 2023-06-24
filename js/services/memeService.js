'use strict'


const STORAGE_KEY = 'memeDB'

const PAGE_SIZE = 5
var gPageIdx = 0
var gLastPageIdx

var gSavedMemes = []


var gEmojis = [
    {txt: '😀'}, {txt: '😁'}, {txt: '😍'}, {txt: '😶'},
    {txt: '😴'}, {txt: '😙'}, {txt: '🥴'}, {txt: '😐'},
    {txt: '🤨'}, {txt: '🤣'}, {txt: '🙄'}, {txt: '😎'},
    {txt: '🐒'}, {txt: '🐬'}, {txt: '🐌'}, {txt: '⭐'},
    {txt: '⚡'}, {txt: '❄'}, {txt: '🔥'}, {txt: '💧'},
    {txt: '🦽'}, {txt: '🍺'}, {txt: '🥝'}, {txt: '🍆'},
    {txt: '🥑'}, {txt: '(⌐■_■)'}, {txt: 'ಠ_ಠ'},
]
var gFonts = ['Impact', 'Arial', 'Times New Roman', 'Comic Sans MS']
var gWords = ['Nechmaaaad', 'Boooom.. Lo Oved', 'Otzmati', 'Pashuti', 'Magniiiiv']
var gPos = [
    {x: 280, y: 325}, {x: 170, y: 140}, {x: 210, y: 260},
    {x: 110, y: 200}, {x: 240, y: 220}, {x: 130, y: 180},
    {x: 130, y: 240}, {x: 260, y: 190}, {x: 150, y: 190},
    {x: 140, y: 350}, {x: 270, y: 380}, {x: 150, y: 310}
]

var gYpos = 200

var gMeme = {
    id: null,
    selectedImgURL: null,
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            id: makeId(),
            txt: 'I sometimes eat Falafel',
            size: 36,
            font: 'Impact',
            color: 'white',
            textAlign: 'center',
            x: 225,
            y: 50,
            width: 350,
            height: 36,
        },
        {
            id: makeId(),
            txt: 'Omnomnomnom',
            size: 36,
            font: 'Impact',
            color: 'white',
            textAlign: 'center',
            x: 225,
            y: 400,
            width: 200,
            height: 36,
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
function setImgURL(imgId) {
    gMeme.selectedImgURL = `img/meme-imgs-square/${imgId}.jpg`
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
    const lineIdx = (gMeme.selectedLineIdx < gMeme.lines.length-1) ? gMeme.selectedLineIdx + 1 : 0
    setSelectedLineIdx(lineIdx)
}

function getLineById(lineId) {
    return gMeme.lines.find(line => lineId === line.id)
}

function addNewLine(txt) {
    const id = makeId()

    gMeme.lines.push(
        {
            id: id,
            txt,
            size: 36,
            font: 'Impact',
            color: 'white',
            textAlign: 'center',
            x: 225,
            y: gYpos++,
            width: gCtx.measureText(txt).width,
            height: 36
        }
    )
    return id
}

function removeAllLines() {
    gMeme.lines = []
}

function removeSelectedLine() {
    if(!gMeme.lines.length) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--
    if(gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = 0
}

function setLineDimensions(x, y, width, height) {
    console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx)
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.x = x
    line.y = y
    line.width = width
    line.height = height
}

// Feature A
function createRandomLineProperties() {
    var randPos = getRandomPos(gPos)
    var randSize = getRandomInt(20, 50)

    return {
        id: makeId(),
        txt: getRandomWord(gWords),
        size: randSize,
        font: getRandomFont(gFonts),
        color: getRandomColor(),
        textAlign: 'center',
        x: randPos.x,
        y: randPos.y,
        width: 350,
        height: randSize,
    }
}

function createRandomMeme() {
    const lineNum = getRandomInt(2, 3)
    for (var i = 0; i < lineNum; i++) {
        gMeme.lines.push(createRandomLineProperties())
    }
}

function getRandImg() {
    return getRandomImg(gImages).src
}

function changePage(change) {
    gPageIdx += change

    if (gPageIdx * PAGE_SIZE >= gEmojis.length) gPageIdx = 0
    if (gPageIdx < 0) gPageIdx = gLastPageIdx
}

function getEmojis() {
    const emojis = gEmojis
    const startIdx = gPageIdx * PAGE_SIZE
    gLastPageIdx = parseInt(emojis.length / PAGE_SIZE)
    return emojis.slice(startIdx, startIdx + PAGE_SIZE)
}

function saveMeme() {
    gMeme.id = makeId()
    var savedMeme = JSON.parse(JSON.stringify(gMeme))
    gSavedMemes.push(savedMeme)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function getMemes() {
    var memes = loadFromStorage(STORAGE_KEY)
    if (!memes) memes = []
    return memes
}