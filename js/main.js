

function onInit(){
    renderGallery()
}

function switchToGalleryView() {
    showGallery()
    hideMeme()
    renderGallery()
}
function switchToMemeView(){
    hideGallery()
    showMeme()
    renderMeme()
}


function hideGallery() {
    hideElement('.img-gallery-section')
}
function showGallery() {
   showElement('.img-gallery-section')
}
function hideMeme() {
    hideElement('.meme-section')
}
function showMeme() {
    showElement('.meme-section')
}