'use strict'

function onInit() {
    renderGallery()
    addMouseListeners()
    addTouchListeners()
}

function switchToGalleryView() {
    showGallery()
    hideMeme()
    hideSavedMemes()
    renderGallery()
    resetOtherImg()
}

function switchToMemeView() {
    showMeme()
    hideGallery()
    hideSavedMemes()
    renderMeme()
    renderEmojiLine()
}

function switchToSavedMemesView() {
    showSavedMemes()
    hideGallery()
    hideMeme()
    renderSavedMemes()
}