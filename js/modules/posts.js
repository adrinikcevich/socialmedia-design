
const allpostsContainer = document.querySelector(".allposts-container")
const comingpostsContainer = document.querySelector(".comingposts-container")

import { localStorage } from "../index.js"

export const DateTime = luxon.DateTime;
let relativeDates=[]
let postList = []



export async function loadDefaultPost(){
    const postsReq = await fetch('js/posts.json')
    const posts = await postsReq.json()
    posts.forEach((post)=>{
        const newPost = createPost(post.user,post.description,post.image,post.date,true)
        allpostsContainer.appendChild(newPost)
    })
    
}

export const loadPosts = ()=>{
    const fragment = document.createDocumentFragment();
    const posts = JSON.parse(localStorage.posts);
    let i=0;
    posts.forEach((post)=>{
        
        const newPost = createPost(post.user,post.description,post.image,post.date,false)
        const dateInfo = newPost.firstChild.firstChild.nextSibling
        refreshDateTime(dateInfo,relativeDates[i])
        i++
        fragment.appendChild(newPost)

    })
    comingpostsContainer.innerHTML = ""
    comingpostsContainer.insertBefore(fragment,comingpostsContainer.firstChild)
}



function createPost(username,desc,url,date,isDefault){
    
    const container = document.createElement("DIV");
    const postInfoContainer = document.createElement("div")
    const user = document.createElement("h3")
    const postDate = document.createElement("span")
    const descriptionContainer = document.createElement("DIV")
    const description = document.createElement("P")
    const buttonsContainer =document.createElement("div")
    const like = document.createElement("div")
    const comments = document.createElement("span")

    user.textContent= username;
    description.textContent= desc;
    postDate.textContent=date;
    postInfoContainer.appendChild(user)
    postInfoContainer.appendChild(postDate)
    buttonsContainer.appendChild(like)
    buttonsContainer.appendChild(comments)
    descriptionContainer.appendChild(description)
    descriptionContainer.appendChild(buttonsContainer)
    

    postInfoContainer.classList.add("post-infoContainer")
    postDate.classList.add("post-date")
    container.classList.add("post-container")
    user.classList.add("post-username");
    descriptionContainer.classList.add("post-descriptionContainer")
    description.classList.add("post-description")
    buttonsContainer.classList.add("post-buttonsContainer")
    like.classList.add("likeButton")
    comments.classList.add("commentsButton")
    comments.classList.add("iconify","commentsButton")
    comments.setAttribute("data-icon","cil:comment-bubble")

    like.addEventListener("click",()=>{
        like.classList.toggle("liked")
        console.log("liked")
    })

    container.appendChild(postInfoContainer)
    if(url != null){
        const image = new Image()
        image.src = url
        image.classList.add("post-image")
        container.appendChild(image)
    }

    container.appendChild(descriptionContainer)

    return container
}




const refreshDateTime=(elemento,reference)=>{
    if(!elemento.classList.contains("posted")){
        setInterval(()=>{
            elemento.textContent = reference.toRelative();
        },100)
    }
}


export const savePost=(username,desc,url)=>{
    const now = DateTime.now()
    relativeDates.unshift(now)
    const postSave = {
        user:username,
        description:desc,
        image:url,
    }

    postList.unshift(postSave)
    localStorage.posts=JSON.stringify(postList)

}
