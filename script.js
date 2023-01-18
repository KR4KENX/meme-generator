window.onload = function(){
    memeApp.loadData();
}

//downloading images from API

let memeApp = {
    memeData: null,
    memeNumber: 0,
    memeTitleDomEl: null,
    memeImgDomEl: null,

    loadData: function(){
        fetch("https://api.imgflip.com/get_memes")
        .then( response => response.json())
        .then(data => memeApp.dataReady(data))
    },
    dataReady: function(data){
        console.log(data);
        memeApp.memeData = data.data.memes;
        memeApp.memeTitleDomEl = document.getElementsByClassName("meme-title")[0];
        memeApp.memeImgDomEl = document.querySelector(".meme-img");

        document.addEventListener("keydown",function(e){
            switch(e.keyCode){
                case 37:
                    //left
                    memeApp.previousMeme();
                    break;
                case 38:
                    //up
                    break;
                case 39:
                    //right
                    memeApp.nextMeme();
                    break;
                case 40:
                    //down
                    break;
            }
        });

        this.nextMeme();
    },
    nextMeme: function(){
        this.setDOMData();
        this.memeNumber++;

        if(this.memeNumber >= this.memeData.length) this.memeNumber = 0;
    },
    previousMeme: function(){
        this.memeNumber--;
        this.setDOMData();
        
        if(this.memeNumber <= 0) this.memeNumber = this.memeData.length;
    },
    setDOMData: function(){
        let imgData = this.memeData[this.memeNumber];
        this.memeTitleDomEl.innerHTML = imgData.name;
        this.memeImgDomEl.style.cssText = `background: url("${imgData.url}");
        background-repeat: no-repeat;
        background-size: 100% 100%;";`

        document.title = "MEME #" + this.memeNumber;
    }
}

// Text handler script


let topForm = document.getElementById("top-form");
let bottomForm = document.getElementById("bottom-form");

let imgTopText = document.getElementById("img-top-text");
let imgBottomText = document.getElementById("img-bottom-text");

function newTopText(){
    let formClone = topForm.cloneNode(true);
    let textClone = imgTopText.cloneNode(true);

    formClone.id = "top-formCloned"
    textClone.id = "img-top-text-clone"

    document.querySelector(".top-forms").appendChild(formClone);
    document.querySelector(".meme-img").appendChild(textClone);

    document.querySelectorAll(".top-forms input[type='button']").forEach((element) => {
        element.remove();
    });

    let inputList = document.querySelectorAll("#top-formCloned .form-part input")
    
    for(let el of inputList){
        el.id += "-clone";
        console.log(el);
    }

}
function newBottomText(){
    //Create elemnts copy on website
    let formClone = bottomForm.cloneNode(true);
    let textClone = imgBottomText.cloneNode(true);

    formClone.id = "bottom-formCloned"
    textClone.id = "img-bottom-text-clone"

    document.querySelector(".bottom-forms").appendChild(formClone);
    document.querySelector(".meme-img").appendChild(textClone);
    //Remove possibility to create infinite elements, only 1 more for top and bottom!
    document.querySelectorAll(".bottom-forms input[type='button']").forEach((element) => {
        element.remove();
    });
    //Changing id of each input field
    let inputList = document.querySelectorAll("#bottom-formCloned .form-part input")
    
    for(let el of inputList){
        el.id += "-clone";
        console.log(el);
    }
}

function setTextOnImg(textEl, textIn, textX, textY, topPropShift){
    textEl.innerHTML = textIn.value;
    textEl.style.marginLeft = (textX.value*2) + "%";
    textEl.style.top = topPropShift - (textY.value*2) + "%";
}

document.querySelector(".top-forms").addEventListener("input",() => {
    setTextOnImg(imgTopText,document.getElementById("top-text"),document.getElementById("top-text-x"),document.getElementById("top-text-y"),40);
    setTextOnImg(document.getElementById("img-top-text-clone"),document.getElementById("top-text-clone"),document.getElementById("top-text-x-clone"),document.getElementById("top-text-y-clone"),40)
})

document.querySelector(".bottom-forms").addEventListener("input",()=>{
   setTextOnImg(imgBottomText,document.getElementById("bottom-text"),document.getElementById("bottom-text-x"),document.getElementById("bottom-text-y"),100)
   setTextOnImg(document.getElementById("img-bottom-text-clone"),document.getElementById("bottom-text-clone"),document.getElementById("bottom-text-x-clone"),document.getElementById("bottom-text-y-clone"),100)
})


