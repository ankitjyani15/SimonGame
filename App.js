let gameSeq = [];
let userSeq = [];

let btnColors = ["red","yellow","green","purple"]
let h2 = document.querySelector("h2");

let started = false;
let level = 0;

let highestScore = localStorage.getItem("highestScore") || 0;
document.getElementById("highest-score").textContent = `Highest Score: ${highestScore}`;
function updateHighestScore(currentScore) {
    if (currentScore > highestScore) {
        highestScore = currentScore;
        localStorage.setItem("highestScore", highestScore); // Save the new highest score
        document.getElementById("highest-score").textContent = `Highest Score: ${highestScore}`; // Update the display
    }
}

document.addEventListener("keypress",function(){
    if(started == false){
        started = true;
    }
    levelUp();
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function () {
 btn.classList.remove("flash");
    },200);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function () {
 btn.classList.remove("userFlash");
    },200);
}
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

let randIndex = Math.floor((Math.random()*4));
let randColor = btnColors[randIndex];
let randBtn = document.querySelector(`.${randColor}`);
gameSeq.push(randColor);
    gameFlash(randBtn);
}
 function checkAnswer(idx){
    

    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
        

    }
    else{
       
        h2.innerHTML = `Game Over! , <b>Your score was ${level}</b><br> Press any Key to start again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        
        reset();
    }

 }

function butnPressed(){
   let btn = this;
   userFlash(btn);
   usercolor = btn.getAttribute("id");
   userSeq.push(usercolor)
   checkAnswer(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click",butnPressed);
}
function reset(){
    const currentScore = level;
    updateHighestScore(currentScore);
    started = false;
    gameSeq =[];
    userSeq = [];
    level = 0;
}