'use strict'



var gMeme = { selectedImgId: null, selectedLineIdx: -1, lines: [] }

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

function setMemeImageId(imgId){
    gMeme.selectedImgId = imgId
}

function _createImage(imgId) {
    var imgUrl = `img/meme-imgs-square/${imgId}.jpg`
    return {
        id: imgId,
        imgUrl,
    }
}
