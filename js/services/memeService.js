'use strict'


var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat']}]
var gMeme = {
    selectedImgId: 5, selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
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

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}