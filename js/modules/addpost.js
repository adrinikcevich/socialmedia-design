import {loadPosts, savePost} from './posts.js'
import {DateTime} from './posts.js'


const newPostContainer = document.querySelector(".new-post-container")
const newPostButton = document.querySelector(".add-post-button")
const form = document.querySelector('.new-post-form')
const addPhoto = document.getElementById("upload-photo");
const postButton = document.querySelector(".post-button");
const textAreaContainer = document.querySelector(".form-txtarea-container")
const textArea = document.getElementById('new-post-textarea')



newPostButton.addEventListener("click",()=>{
    form.classList.toggle("displayed");
    
    form.classList.toggle("formAnimationHandle");
    
    newPostContainer.classList.toggle("np-height")
    pulse(newPostButton,"rgb(42, 45, 128)","rgb(62, 65, 155)");
})


let currentImg=null;

const pulse = (element,oldColor,newColor)=>{

    element.style.backgroundColor = newColor;
    element.style.transition = "background-color 0s"
    setTimeout(()=>{
        element.style.transition = "background-color 1s"
        element.style.backgroundColor = oldColor
        
    },100)
}

postButton.addEventListener("click",(e)=>{
    e.preventDefault()
    if(postButton.classList.contains("validate")){
        postButton.classList.remove("validate")
        form.classList.add("formAnimationHandle");
        newPostContainer.classList.remove("np-height")
        savePost("@User",textArea.value,currentImg)
        
        textArea.value="";
        if(form.classList.contains("imgprev")){
            deleteImgPrev();
        }

        setTimeout(()=>{
            loadPosts()
        },500)

    }

})

textArea.addEventListener("input",(e)=>{
    if(textArea.value.trim().length > 0){
        postButton.classList.add("validate")
    }else if(!form.classList.contains("imgprev")){
        postButton.classList.remove("validate")
    }
})


addPhoto.addEventListener("change",(e)=>{
    const reader = new FileReader()

    reader.readAsDataURL(e.target.files[0])
    reader.addEventListener("load",()=>{
        
        const fragment = document.createDocumentFragment();
        fragment.appendChild(setImgPreview(reader.result));
        currentImg = reader.result;
        if(form.classList.contains('imgprev')){
            const oldprev = document.querySelector(".postpreview-container");
            textAreaContainer.replaceChild(fragment,oldprev)
        }else{
            form.classList.add("imgprev")
            textAreaContainer.appendChild(fragment)
            postButton.classList.add("validate")
        }

    })
})
const deleteImgPrev = ()=>{
    form.classList.remove("imgprev")
    textAreaContainer.removeChild(document.querySelector(".postpreview-container"))
    currentImg= null;
    if(textArea.value.length == 0){
        postButton.classList.remove("validate")
    }
}

const setImgPreview = (src)=>{
    const container = document.createElement("DIV")
    const img = new Image()
    const removeImgContainer = document.createElement("DIV")
    const removeImg = document.createElement("span");

    removeImgContainer.classList.add("removeImgPrevContainer")
    removeImg.classList.add("iconify")
    removeImg.classList.add("removeImgPrev")
    removeImg.setAttribute("data-icon","pepicons:times")

    removeImgContainer.appendChild(removeImg)
    removeImgContainer.addEventListener("click",()=>{
        deleteImgPrev();
    })

    container.classList.add("postpreview-container")
    img.classList.add("postpreview")
    img.src=src;

    container.appendChild(removeImgContainer)
    container.appendChild(img)
    return container
}


