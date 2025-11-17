const placeholder = document.querySelector("#gmail_input");
const butCheckGmail = document.querySelector("#gmail_button");
const result = document.querySelector("#gmail_result");

const reqExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

butCheckGmail.addEventListener('click', ()=>{
    if(reqExp.test(placeholder.value)){
        result.innerHTML = "Эта почта существует";
        result.style.color = 'green';
    }else{
        result.innerHTML = "Этой почты не существует";
        result.style.color = 'red';
    }
})





let direction = 'right'; 

function moveBlock() {
    const childBlock = document.querySelector('.child_block');
    const parentBlock = document.querySelector('.parent_block');

    const parentWidth = parentBlock.offsetWidth;
    const parentHeight = parentBlock.offsetHeight;


    let top = parseInt(childBlock.style.top, 10) || 0;
    let left = parseInt(childBlock.style.left, 10) || 0;


    if (direction === 'right') {
        left += 50;
        if (left >= parentWidth - 50) { 
            direction = 'down';
        }
    }

    if (direction === 'down') {
        top += 50;
        if (top >= parentHeight - 50) {
            direction = 'left'; 
        }
    }

   
    if (direction === 'left') {
        left -= 50;
        if (left <= 0) { 
            direction = 'up'; 
        }
    }


    if (direction === 'up') {
        top -= 50;
        if (top <= 0) {
            direction = 'right'; 
        }
    }

    
    childBlock.style.top = top + 'px';
    childBlock.style.left = left + 'px';
}

setInterval(moveBlock, 1000);


const minutesEl = document.querySelector("#minutesS");
const secondsEl = document.querySelector("#secondsS");
const mlSecondsEl = document.querySelector("#ml-secondsS");

const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

let interval; 
let milliseconds = 0;
let seconds = 0;
let minutes = 0;


function updateTimer() {
  milliseconds += 10;

  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
  }

  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }


  const m = minutes < 10 ? "0" + minutes : minutes;
  const s = seconds < 10 ? "0" + seconds : seconds;
  const ms = Math.floor(milliseconds / 10);
  const msDisplay = ms < 10 ? "0" + ms : ms;


  minutesEl.textContent = m;
  secondsEl.textContent = s;
  mlSecondsEl.textContent = msDisplay;
}


startBtn.addEventListener("click", () => {
  if (!interval) {
    interval = setInterval(updateTimer, 10);
  }
});


stopBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = null; 
});


resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  minutesEl.textContent = "00";
  secondsEl.textContent = "00";
  mlSecondsEl.textContent = "00";
});