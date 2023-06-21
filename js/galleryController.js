'use strict'

// console.log('getImages()', getImages())
// console.log('getMeme()', getMeme())



function renderGallery(images) {
    var images = getImages()
    var strHTMLs = images.map(image => `
        <li class="gallery-img">
            <a href="#" onclick="onImgSelect(${image.id})"><img src="${image.imgUrl}" alt=""></a>
        </li>
    `)
    document.querySelector('.img-gallery').innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
    hideGallery()
    showMeme()
}

function hideGallery() {
    hideElement('.img-gallery-section')
}
function showGallery() {
   showElement('.img-gallery-section')
}