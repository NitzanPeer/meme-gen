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
