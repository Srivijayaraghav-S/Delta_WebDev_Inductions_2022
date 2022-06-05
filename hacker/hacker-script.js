// const fs = require('fs')
var checks = [];
var solution = [];
const arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'];
var leaderboard = [];
var c = 0;
var second = 0;
var curr = 1;
var score = 0;
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var scoreelement = document.getElementById("score");
var modalcontent = document.getElementById("modalcontent");
var start = document.getElementById("start");
var playagain = document.getElementById("play-again");
var timer = document.getElementById("timer");
var secondstimer = document.getElementById("seconds");
var minutestimer = document.getElementById("minutes");
const delayTime = 500;
var x = ["1", "2", "3", "4", "5"];
var audio = new Audio("onclick.wav");
var audioEnd = new Audio("endgame.wav");
var timerloop;
var z = '';

/*for (var i = 0; i < 5; i++) {
    localStorage.setItem(i, 0);
}
*/
start.addEventListener('click', () => {
    second = 0;
    score = 0;
    curr = 1;
    console.log("Yes");
    console.log(leaderboard);
    detectTableClicks();
    generateSolution();
    timer.style.visibility = "visible";
    highlight();
    timerloop = setInterval(function () {
        secondstimer.innerHTML = pad(++second % 60);
        minutestimer.innerHTML = pad(parseInt(second / 60, 10));
    }, 1000);
    start.style.visibility = "hidden";
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function playAudio() {
    var a = document.getElementById("myAudio");
    a.play();
}
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function generateSolution() {
    solution = shuffle(arr);
}

async function highlight() {
    for (var i = 0; i < curr; i++) {
        var id = solution[i];
        var selection = document.getElementById("" + id);
        console.log("HI " + curr + "  " + selection.id);
        selection.classList.add("lightup");
        selection.classList.remove("lightdown");
        await sleep(delayTime);
        selection.classList.remove("lightup");
        selection.classList.add("lightdown");
        checks.push(id);
    }
    console.log(checks);
}

function detectTableClicks() {
    var cells = document.querySelectorAll("#t td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", async function () {
            console.log(this.id);
            //this.style.backgroundColor = 'pink';
            //sleep(500);
            //this.style.backgroundColor = 'rgb(' + 27 + ',' + 23 + ',' + 23 + ')';
            //var x = document.getElementById("myAudio");
            //x.play();
            this.classList.add("clickon");
            this.classList.remove("clickoff");
            audio.play();
            //setTimeout(function () {
            //this.classList.add("clickoff");
            //this.classList.remove("clickon");
            //}, 10);
            await sleep(delayTime);
            this.classList.add("clickoff");
            this.classList.remove("clickon");
            this.classList.remove("clickoff");
            await sleep(delayTime);
            if (!checkClicks("" + this.id)) {
                timer.style.visibility = "hidden";
                clearInterval(timerloop);
                insertScore();
                modalcontent.innerHTML = "<h4>Leaderboard: <br>" +
                    localStorage.getItem(0) + "<br>" +
                    localStorage.getItem(1) + "<br>" +
                    localStorage.getItem(2) + "<br>" +
                    localStorage.getItem(3) + "<br>" +
                    localStorage.getItem(4) + "<\h4>";
                modal.style.display = "block";
                audioEnd.play();
                span.onclick = function () {
                    modal.style.display = "none";
                    start.style.visibility = "visible";
                }
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                        start.style.visibility = "visible";
                    }
                }
                return;
            }
            await sleep(delayTime);
        });
    }
}

function checkGameOver() {
    if (checks.length === 0) {
        curr = curr + 1;
        highlight();
        return;
    }
    if (curr === 36) {
        timer.style.display = "none";
        clearInterval(timerloop);
        insertScore();
        second = 0;
        modalcontent.innerHTML = "<h1>Leaderboard: </h1><p>" +
            localStorage.getItem(0) + "<br>" +
            localStorage.getItem(1) + "<br>" +
            localStorage.getItem(2) + "<br>" +
            localStorage.getItem(3) + "<br>" +
            localStorage.getItem(4) + "<br>" +
            "</p>Congrats! Go to next level!";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
            start.style.visibility = "visible";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                start.style.visibility = "visible";
            }
        }
    }
    return;
}

function checkClicks(id) {
    if (checks[0] === id) {
        checks.shift();
        console.log(checks);
        score = score + 1;
        scoreelement.innerHTML = "Score: " + score;
        checkGameOver();
        return true;
    }
    return false;
}
function clickingon(ele) {
    ele.classList.add("clickon");
    ele.classList.remove("clickoff");
}
function clickingoff(ele) {
    ele.classList.add("clickoff");
    ele.classList.remove("clickon");
}

function pad(value) { return value > 9 ? value : "0" + value; }

/*function insertScore() {
    for(var i = 0; i < 5; i++) {
        if(score>localStorage.getItem(i)) {
            var temp = localStorage.getItem(i);
            for(var j = i + 1; j < 5; j++) {
                localStorage.setItem(j, temp);
                if(localStorage.getItem(j+1)){
                    temp = localStorage.getItem(j+1);
                }
                else {
                    break;
                }   
            }
            localStorage.setItem(i, score);
            break;
        }
        else if(score<localStorage.getItem(i)) {
            localStorage.setItem(i, score);
            break;
        }
    }
}*/

function insertScore() {
    for (var i = 0; i < 5; i++) {
        if (localStorage.getItem(i) !== null) {
            leaderboard[i] = parseInt(localStorage.getItem(i));
        }
        else {
            leaderboard[i] = 0;
        }
    }
    console.log(leaderboard);
    leaderboard.push(score);
    console.log(leaderboard);
    //leaderboard = leaderboard.sort();
    leaderboard = leaderboard.sort(function (a, b) {
        return a - b;
    });
    console.log(leaderboard);
    leaderboard = leaderboard.reverse();
    console.log(leaderboard);
    for (var i = 0; i < 5; i++) {
        localStorage.setItem(i, leaderboard[i].toString());
    }
    return;
}
