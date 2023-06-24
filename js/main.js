'use strict'

function onInit() {
    switchToMemeView()
    addMouseListeners()
    addTouchListeners()
    // renderGallery()
}

function switchToGalleryView() {
    showGallery()
    hideMeme()
    renderGallery()
    resetOtherImg()
}

function switchToMemeView(){
    hideGallery()
    showMeme()
    renderMeme()
    renderEmojiLine()
}