'use strict'


function renderSavedMemes() {
    const memes = getMemes()
    console.log('memes', memes)
    if (!memes.length) return
    var strHTMLs = memes.map(meme => `
        <li class="saved-meme">
            <a href="#" onclick="onSavedSelect('${meme.id}')"><img src="${meme.selectedImgURL}" alt=""></a>
        </li>
    `)
    document.querySelector('.saved-memes').innerHTML = strHTMLs.join('')
}

function onSavedSelect(imgId) {
    setImg(imgId)
    setImgURL(imgId)
    switchToMemeView()
}

function hideSavedMemes() {
    hideElement('.saved-memes-section')
}
function showSavedMemes() {
    showElement('.saved-memes-section')
}