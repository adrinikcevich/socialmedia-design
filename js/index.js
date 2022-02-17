import './modules/addpost.js'
import './modules/posts.js'
import {loadDefaultPost, loadPosts} from './modules/posts.js';
export const localStorage = window.localStorage
localStorage.setItem("posts",[])
loadDefaultPost();

const friendSearchBar = document.querySelector(".friends-searchbar-input")
const friendsUsernames = document.querySelectorAll(".friend-username")
const checkbox = document.getElementById("online");

checkbox.addEventListener("change",()=>{
    verifyStatus()
})
friendSearchBar.addEventListener("input",()=>{
    verifyName()
})

const verifyStatus = ()=>{
    if(checkbox.checked){
        document.querySelectorAll(".offline").forEach((status)=>{
            status.parentElement.parentElement.classList.add("disabled")
        })

    }else{
        document.querySelectorAll(".offline").forEach((status)=>{
            status.parentElement.parentElement.classList.remove("disabled")
        })

    }
}

const verifyName = ()=>{
    let foundresults = false;
    friendsUsernames.forEach((username)=>{
        if(!username.textContent.startsWith(friendSearchBar.value)){
            username.parentElement.parentElement.classList.add("disabled")
        }else{
            username.parentElement.parentElement.classList.remove("disabled")
        }
    })
    friendsUsernames.forEach((username)=>{
        if(!username.parentElement.parentElement.classList.contains("disabled")){
            document.querySelector(".nofriendsfound-box").classList.add("disabled")
            foundresults = true
        }
    })
    if(!foundresults){
        document.querySelector(".nofriendsfound-box").classList.remove("disabled")
    }
}


//RESPONSIVE

const displaymenuBtn = document.querySelector(".displaymenu-btn")
const navResponsive = document.querySelector(".nav-responsive-container")

displaymenuBtn.addEventListener("click",()=>{
    console.log(navResponsive)
    navResponsive.classList.toggle("displayed-nav");
})