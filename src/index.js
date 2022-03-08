document.addEventListener("DOMContentLoaded", function(){
    testJs()
    findFavorites()
    // getFavoritedMemes()
})
function testJs(){
    // const memesContainer = document.querySelector('article')
    
    fetch("https://api.imgflip.com/get_memes")
        .then((resp)=> resp.json())
        .then((data)=>{
            // console.log(data.data.memes)
            renderMemes(data.data.memes)            
        })
}

const memesContainer = document.getElementById('memesContainer')

const likedMems=[]

function findFavorites(){
    alert("Herezzzz")
    fetch("http://localhost:3000/favorites")
        .then((resp)=>resp.json())
        .then((data)=>{
            data.map((meme)=>{
                // let likedMems=[];
                // console.log(meme.name)
                // likedMems.push(meme.id)
                pushtoLikedMems(meme.id)
                // formatButtons(meme.id)
            })
        })   
}

function pushtoLikedMems(memeId){
    likedMems.push(memeId)
    // console.log(likedMems)
    const favoriteBttn = document.getElementById(memeId)
    favoriteBttn.classList.add('btn-danger')
    favoriteBttn.id=memeId
    if(likedMems.includes(memeId)){
        // console.log(memeId)
        favoriteBttn.textContent = "Ishaclickiwa"
        favoriteBttn.classList.add('disabled')
        favoriteBttn.disabled = true
    }
    else{
        favoriteBttn.textContent = "Bado haijaclickiwa"
    }
}




function getlikedMemd(){
    return likedMems
}


function formatButtons(memeId,favoriteBtn){
    // alert("tuko hapa")
    const favoriteBttn = favoriteBtn
    favoriteBttn.textContent = "Favorite"
    favoriteBttn.classList.add('btn-danger')
    favoriteBttn.id=memeId
    if(likedMems.includes(memeId)){
        // alert("Allaaaahhhh")
        favoriteBttn.textContent = "Ishaclickiwa"
    }
    else{
        favoriteBttn.textContent = "Bado haijaclickiwa"
    }
}

function renderMemes(data, container=memesContainer){
    console.log(data)
    console.log(container)
    const memeContainer = container
    const allmemes = data
            allmemes.map((meme)=>{
                // formatButton(meme.id)
                const memeCont = document.createElement('div')
                const memeImgCont = document.createElement('img')
                const memeNameCont = document.createElement('p')
                const favoriteBtn = document.createElement('button')
                formatButtons(meme.id,favoriteBtn)
                // favoriteBtn.textContent = "Favorite"
                // favoriteBtn.classList.add('btn-danger')
                // favoriteBtn.id=meme.id
                memeImgCont.src = meme.url
                memeImgCont.classList.add('img-fluid')
                memeCont.classList.add('col-md-3', 'mr-1', 'mb-1','w-100')
                memeNameCont.textContent = meme.name
                memeCont.appendChild(memeImgCont)
                memeCont.appendChild(memeNameCont)
                memeCont.appendChild(favoriteBtn)
                memeContainer.appendChild(memeCont)
                favoriteBtn.onclick = function(){
                    favoriteAMeme(meme)
                }
            })
}


function favoriteAMeme(meme){
    
    fetch("http://localhost:3000/favorites",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(meme)
    })
    .then((resp)=>resp.json())
    .then((data)=>console.log(data))

    alert( `${meme.name} has been saved`)
}

function showFavMemes(){
    const allMemesCont = document.getElementById('favoriteMemesContainer')
    allMemesCont.style.display = "block";
    const favMemesCont = document.getElementById('memesContainer')
    const toggleBtn = document.getElementById('toggleMemes')
    if(favMemesCont.style.display === "none"){
        allMemesCont.style.display = "none"
        favMemesCont.style.display = "block"
        toggleBtn.textContent = "Show Favorite Memes"
        getFaveMemes()
    }
    else{
        allMemesCont.style.display = "block"
        favMemesCont.style.display = "none"
        toggleBtn.textContent = "Show All Memes"
    }
}

function getFaveMemes(){
    const likedMemesCont = document.getElementById('favoriteMemesContainer')
    fetch("http://localhost:3000/favorites")
        .then((resp)=>resp.json())
        .then((data)=>{
                renderMemes(data,likedMemesCont)
        })
}







// Fetch favorited memes
// Store their IDs
// Add classes to the button depending on the Id



// function getFavoritedMemes(){
//     fetch("http://localhost:3000/favorites")
//         .then((resp)=>resp.json())
//         .then((data)=>{
//             data.map((meme)=>{
//                 likedMemes(meme)
//             })      
//         })   
// }





// function getLikedMemes(){
//     fetch("http://localhost:3000/favorites")
//         .then((resp)=>resp.json())
//         .then((data)=>{
//             console.log(data)
//             data.map((meme)=>{
//                 addtoArray(meme)
//             })
//         })
// }

// function addtoArray(meme){
//     let likedMemes = [];
//     likedMemes.push(meme.id)
//     return likedMemes;
// }

// getLikedMemes()

// function formatButton(id){
//     console.log("Nimerun")
//     fetch(`http://localhost:3000/favorites?id=${id}`)
//         .then((resp)=>resp.json)
//         .then((data)=>{
//             const clickedButton = document.getElementById(id)
//             clickedButton.ariaDisabled = true;
//             console.log(data)
//         })
//         .catch(error=>{
//             console.log("Not found", error)
//         })
// }

