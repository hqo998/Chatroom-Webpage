import './style.css';

const countText = document.getElementById("count");
const up_button = document.getElementById("up_but");
const down_button = document.getElementById("down_but");

let countValue = 0;


// 2. Define a function (what should happen?)
function changeText(x) {
    countValue += x;
    console.log(countValue);
    countText.textContent = countValue;
    window.ping(countValue);
    
}

// 3. Add an event listener (when should it happen?)
up_button.addEventListener('click', () => { changeText(1) });

down_button.addEventListener('click', () => { changeText(-1) });


const tickerText = document.getElementById("ticker");

let tickerValue = 0;

function updateticker()
{
    tickerValue += 1;
    tickerText.textContent = "Ticker: " + tickerValue;

    requestAnimationFrame(updateticker);
}

updateticker();

