'use strict'

function onInit() {
    renderGallery()
}

function switchToGalleryView() {
    showGallery()
    hideMeme()
    hideSavedMemes()
    renderGallery()
    resetOtherImg()
}

function switchToMemeView() {
    setDefaultLines()
    showMeme()
    hideGallery()
    hideSavedMemes()
    renderMeme()
    renderEmojiLine()
    addMouseListeners()
}

function switchToSavedMemesView() {
    hideGallery()
    showSavedMemes()
    hideMeme()
    renderSavedMemes()
}