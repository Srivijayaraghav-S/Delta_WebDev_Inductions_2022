var checks = [];
var solution = [];
const arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
var curr = 1;
var score = 0;
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var scoreelement = document.getElementById("score");
var modalcontent = document.getElementById("modalcontent");
var start = document.getElementById("start");
var playagain = document.getElementById("play-again");
const delayTime = 500;

start.addEventListener('click', () => {
    detectTableClicks();
    generateSolution();
    highlight();
    start.style.visibility = "hidden";
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
            this.classList.add("clickon");
            this.classList.remove("clickoff");
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
                modalcontent.innerHTML = "Score: " + score;
                modal.style.display = "block";
                span.onclick = function () {
                    modal.style.display = "none";
                    start.disabled = false;
                }
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                        start.disabled = false;
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
    if (curr === 16) {
        modalcontent.innerHTML = "Congrats! Go to next level!";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    return;
}

function checkClicks(id) {
    if (checks.includes(id)) {
        checks = checks.filter(function (value, index, arr) {
            return value != id;
        });
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

/*var cells = document.querySelectorAll("#t td");
for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function () {
        cells[i].classList.add("clickon");
        setTimeout(function () {
            this.classList.add("clickoff");
        }, 500)
        this.classList.add("clickoff");
        this.classList.remove("clickon");
        checkClicks(this.id);
    });
}*/