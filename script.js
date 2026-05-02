var bip = new Audio('media/bip.mp3');
var sixseven = new Audio('media/67.mp3')


let timeLeft;
let countdown;
let click = 1000;

function enterPre() {
    setTimeout(() => {
        enter();
    }, 1000);
}

function enter() {
    const hour = Number(document.getElementById("hour").value) || 0;
    const minute = Number(document.getElementById("minute").value) || 0;
    const second = Number(document.getElementById("second").value) || 0;

    localStorage.setItem("hour", hour);
    localStorage.setItem("minute", minute);
    localStorage.setItem("second", second);

    window.location.href = "timer.html";
}


    document.addEventListener('click', () => {
    bip.play().then(() => bip.pause()).catch(() => {});
    sixseven.play().then(() => sixseven.pause()).catch(() => {});
}, { once: true });


window.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    if (!display) return;

    const hour = Number(localStorage.getItem("hour")) || 0;
    const minute = Number(localStorage.getItem("minute")) || 0;
    const second = Number(localStorage.getItem("second")) || 0;

    const totalSec = (hour * 3600) + (minute * 60) + second;
    timeLeft = totalSec;

    display.textContent = timeLeft;

    if (totalSec < 0) return;

    startTimer();
});

function startTimer() {
    updateDisplay();
    runTimer();
}

function runTimer() {
    if (timeLeft <= 0) {
        timeLeft = 0;
        updateDisplay();

        localStorage.removeItem("hour");
        localStorage.removeItem("minute");
        localStorage.removeItem("second");

        setTimeout(() => {
            window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
        }, 1500);

        return;
    }

    timeLeft--;
    updateDisplay();
    bip.play();

    const display = document.getElementById("display");

    if (timeLeft % 13 === 0 && timeLeft !== 0) {
        const factor = Math.random() * 2;
        scalesize(display, factor);
    }

    if (timeLeft % 20 === 0 && timeLeft !== 0) {
        display.style.fontSize = 100 + 'px';
    }

    if (timeLeft % 7 === 0 && timeLeft !== 0) {
        const factor = Math.random() * 2;
        click *= factor;
    }

    if (timeLeft % 30 === 0 && timeLeft !== 0) {
        click = 1000
    }

    if (timeLeft == 67) {
        
        display.textContent = '6 🫲🤪🫱 7';
        sixseven.play();
        setTimeout(runTimer, 2000);
        return;
    }

    if (timeLeft % 20 === 0 && timeLeft !== 0) {

        addImages()
    }



    setTimeout(runTimer, click);
}

function updateDisplay() {
    const display = document.getElementById("display");
    if (!display) return;

    display.textContent = timeLeft;
}

function scalesize(element, factor) {
    const current = parseFloat(window.getComputedStyle(element).fontSize);
    element.style.fontSize = (current * factor) + 'px';
}



const btn = document.getElementById('stop');

let isSleeping = false;
let timerStarted = false;

if (btn) {
    btn.addEventListener('mouseenter', () => {
        if (isSleeping) return;

        if (!timerStarted) {
            timerStarted = true;

            setTimeout(() => {
                isSleeping = true;
                btn.textContent = 'Too Slow!';
            }, 4000);
        }

        const x = Math.random() * (window.innerWidth - btn.offsetWidth);
        const y = Math.random() * (window.innerHeight - btn.offsetHeight);

        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
    });
}









const title = document.getElementById("title");
let typingSpeed = 50;

function typewriter(text) {
    if (!title) return;
    title.textContent = "";
    let i=0;
    function typing() {
        if ( i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typing, typingSpeed);
        }
        else {
            blink();
        }
    }
    typing();
}
function blink() {
    let show = true;

    setInterval(() => {
        if (!title )return;
        if(show) {
            title.textContent = title.textContent.slice(0, -1);
            title.textContent = title.textContent.slice(0, -1);
            title.textContent = title.textContent + "_";
        } else {
            title.textContent = title.textContent.slice(0, -1);
            title.textContent = title.textContent + "  ";
        }

        show = !show;
    }, 500);
}



  
    
    



let spawnInterval = null;
let mainLoop = null;


function addImages() {
    const container = document.getElementById("container");
    if (!container) return;

    clearInterval(spawnInterval);

    let count = 0;

    spawnInterval = setInterval(() => {
        const img = document.createElement("img");
        img.src = "media/blobfish1.png"; // make sure this path is correct
        img.classList.add("blobfish");

        img.style.width="80px";
        img.style.top = "0px";
        img.style.position = "absolute";
        img.style.left = Math.random() * (window.innerWidth - 80) + "px";

        container.appendChild(img);

        count++;

        if (count >= 1000) { // reasonable number
            clearInterval(spawnInterval);
        }
    }, 100);

    setTimeout(() => {
        const enoughBtn = document.getElementById("enough");
        if (enoughBtn) enoughBtn.style.display = "block";
    }, 1500);
}

function stopImages() {
    clearInterval(spawnInterval);
    clearInterval(mainLoop);

    spawnInterval = null;
    mainLoop = null;

    document.querySelectorAll(".blobfish").forEach(img => img.remove());

    const enoughBtn = document.getElementById("enough");
    if (enoughBtn) enoughBtn.style.display = "none";
}
