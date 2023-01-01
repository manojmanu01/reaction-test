
function random(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const start_button = document.querySelector(".start");
const timervalue = document.querySelector(".timer .value");
let score = 0; // global state

/////////////////////////

function refreshScoreboard() {
    document.querySelector(".scoreboard span").innerText = score;
}

function resetgame() {
    timervalue.classList.add("go");
    score = 0;
    start_button.style.display="block";
    document.querySelectorAll(".win").forEach(ele => ele.remove());
    refreshScoreboard();
}

function endgame(){
    alert("You lost!");
    resetgame();
}

function prepareTarget(timer = 3000) {  
    timervalue.classList.remove("go");
    timervalue.offsetHeight;
    timervalue.style.animation = null; 
    timervalue.setAttribute("style","--timer:"+ (timer / 1000) + "s");  
   
    const target = document.createElement("div");
    target.classList.add("win");

    const left = random(0, window.innerWidth - 50);
    const top = random(0, window.innerHeight - 50);

    target.setAttribute("style", `left: ${left}px; top:${top}px`);
    document.body.appendChild(target);
    timervalue.classList.add("go");

   const timeoutid = setTimeout(endgame, timer);

   target.addEventListener("click", function() {
        clearTimeout(timeoutid);
        score += 1;
        refreshScoreboard();
        target.remove(); 
        timervalue.classList.remove("go");
        prepareTarget(timer - 100);
   });

}

function startgame(){
   start_button.style.display="none";
   prepareTarget();
}

start_button.addEventListener("click", startgame);