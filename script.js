window.onload = function(){
    memeApp.loadData();
}

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
        
        if(this.memeNumber < 0) this.memeNumber = this.memeData.length - 1;
    },
    setDOMData: function(){
        let imgData = this.memeData[this.memeNumber];
        this.memeTitleDomEl.innerHTML = imgData.name;
        this.memeImgDomEl.src = imgData.url;

        document.title = "MEME #" + this.memeNumber;
    }
}

let inputTop = document.getElementById("top-text");
let inputBottom = document.getElementById("bottom-text");

let imgTopText = document.getElementById("img-top-text");
let imgBottomText = document.getElementById("img-bottom-text");

inputTop.addEventListener("change", function() {
    imgTopText.innerHTML = inputTop.value;
});
inputBottom.addEventListener("change", function() {
    imgBottomText.innerHTML = inputBottom.value;
});