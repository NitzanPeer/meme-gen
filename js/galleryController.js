'use strict'


function renderGallery() {
    const images = getImages()
    var strHTMLs = images.map(image => `
        <li class="gallery-img">
            <a href="#" onclick="onImgSelect(${image.id})"><img src="${image.imgUrl}" alt=""></a>
        </li>
    `)
    document.querySelector('.img-gallery').innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    setImgURL(imgId)
    setDefaultLines()
    switchToMemeView()
}

function hideGallery() {
    hideElement('.img-gallery-section')
}

function showGallery() {
   showElement('.img-gallery-section')
}