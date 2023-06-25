'use strict'


function renderSavedMemes() {
    const memes = getMemes()
    if (!memes.length) return
    var strHTMLs = memes.map((meme, index) => `
        <li class="saved-meme">
            <a href="#" onclick="onSavedSelect('${meme.selectedImgId}', ${index})"><img src="${meme.selectedImgURL}" alt=""></a>
        </li>
    `)
    document.querySelector('.saved-memes').innerHTML = strHTMLs.join('')
}

function onSavedSelect(imgId, index) {
    setImg(imgId)
    setImgURL(imgId)
    var savedMeme = getSavedMemeByIndex(index)
    setLines(savedMeme.lines)
    switchToMemeView()
}

function hideSavedMemes() {
    hideElement('.saved-memes-section')
}
function showSavedMemes() {
    showElement('.saved-memes-section')
}