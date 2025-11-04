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
