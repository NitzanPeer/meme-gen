'use strict'


function galleryInit(){
    addListeners()
}


function addListeners() {
    magic_all_gallery_images.addEventListener("click", onImageSelected, false);
}

function onImageSelected(){
    // get selected img id
    // switch view
}

function renderImages(images) {
    var strHtmls = images.map(image => `
        <li class="gallery-img">
            <a href="" data-img-id="${image.id}"><img src="${image.imgUrl}" alt=""></a>
        </li>
    `)
    document.querySelector('img-gallery').innerHTML = strHtmls.join('')
}