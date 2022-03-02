document.addEventListener("DOMContentLoaded", function(){
    testJs()
})
function testJs(){
    // const memesContainer = document.querySelector('article')
    const memesContainer = document.getElementById('memesContainer')
    fetch("https://api.imgflip.com/get_memes")
        .then((resp)=> resp.json())
        .then((data)=>{
            console.log(data.data.memes)
            const allmemes = data.data.memes
            allmemes.map((meme)=>{
                const memeCont = document.createElement('div')
                const memeImgCont = document.createElement('img')
                const memeNameCont = document.createElement('p')
                memeImgCont.src = meme.url
                memeImgCont.classList.add('img-fluid')
                memeCont.classList.add('col-md-3', 'mr-1', 'mb-1','w-100')
                memeNameCont.textContent = meme.name
                memeCont.appendChild(memeImgCont)
                memeCont.appendChild(memeNameCont)
                memesContainer.appendChild(memeCont)
            })
        })
}