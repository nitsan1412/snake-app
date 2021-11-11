var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var baseFlag = true;
//starting snake position:
var xSnakeHead = 380;
var ySnakeHead = 280;
var snakeArr = [{ x: "380", y: "280" }];
var appleArr = [];
//choosing directions
var lastDirection = "right";
//score vars:
var score = 0;
var scoreLevel = 1;
var scoreEl = document.getElementById("showScore");
var speed = 200;
var endTime = "";
var endScore;
var interval;
var clock;
// end of snake- back to background:
var deleteFlag = true;
var space = true;
//game over announcment
var gameOverEl = document.getElementById("gameOver");
var winnersArr = [];
var tempWinner = { name: localStorage.getItem(name) };
// base empty canvas
function starterBoard() {
  for (var i = 0; i < 600; i += 20) {
    for (var j = 0; j < 800; j += 20) {
      if (baseFlag) {
        ctx.fillStyle = "rgb(19,57,84)";
        ctx.fillRect(j, i, 20, 20);
      } else {
        ctx.fillStyle = "rgb(28,78,107)";
        ctx.fillRect(j, i, 20, 20);
      }
      baseFlag = !baseFlag;
    }
    baseFlag = !baseFlag;
  }
}

//  careat apples
function addApples() {
  var i = 0;
  while (i === 0) {
    var yApple = 20 * Math.floor(Math.random() * 30);
    var xApple = 20 * Math.floor(Math.random() * 40);
    if (!isSnake(xApple, yApple)) {
      if (isApple(xApple, yApple) === "-1") {
        ctx.fillStyle = "red";
        ctx.fillRect(xApple, yApple, 20, 20);
        appleArr.push({ x: xApple, y: yApple });
        i++;
      }
    }
  }
}

// starting new game with snake and apples:
function stratGame() {
  ctx.fillStyle = "rgb(255,211,42)"; //yellow
  ctx.fillRect(xSnakeHead, ySnakeHead, 20, 20);
  addApples();
  addApples();
  addApples();
  timer();
}

//score level up:
function checkLevel(score, interval) {
  switch (score) {
    case 3:
      scoreLevel = 2;
      speed = 150;
      addApples();
      clearInterval(interval);
      playGame();
      break;
    case 15:
      scoreLevel = 3;
      speed = 125;
      addApples();
      clearInterval(interval);
      playGame();
      break;
    case 150:
      scoreLevel = 4;
      speed = 100;
      addApples();
      clearInterval(interval);
      playGame();
      break;
    case 550:
      scoreLevel = 5;
      speed = 75;
      addApples();
      clearInterval(interval);
      playGame();
      break;
    case 1500:
      scoreLevel = 6;
      speed = 50;
      addApples();
      clearInterval(interval);
      playGame();
      break;
  }
  console.log("scoreLevel is: " + scoreLevel);
}

// if apple- return index in array:
function isApple(currentX, currentY) {
  var apple = "-1";
  for (var i = 0; i < appleArr.length; i++) {
    if (appleArr[i].x === currentX && appleArr[i].y === currentY) {
      apple = i;
    }
  }
  return apple;
}
// checks if the next step is part of the snake:
function isSnake(currentX, currentY) {
  var snake = false;
  for (var i = 0; i < snakeArr.length; i++) {
    if (snakeArr[i].x === currentX && snakeArr[i].y === currentY) {
      snake = true;
    }
  }
  return snake;
}

//when eating apples
function eatingApples(index, interval) {
  checkLevel(score, interval);
  score += scoreLevel;
  scoreEl.innerHTML = "score: " + score;
  appleArr.splice(index, 1);
  addApples();
}

//a step without apples:
function step() {
  var tempx = snakeArr[0].x - 0;
  var tempy = snakeArr[0].y - 0;
  if (deleteFlag) {
    ctx.fillStyle = "rgb(28,78,107)";
    ctx.fillRect(tempx, tempy, 20, 20);
  } else {
    ctx.fillStyle = "rgb(19,57,84)";
    ctx.fillRect(tempx, tempy, 20, 20);
  }
  snakeArr.shift();
  deleteFlag = !deleteFlag;
}

// getting the events of typing on keyboard:
window.onkeydown = function chooseDirection(event) {
  if (event.keyCode === 37) {
    event.preventDefault();
    lastDirection = "left";
  } else if (event.keyCode === 39) {
    event.preventDefault();
    lastDirection = "right";
  } else if (event.keyCode === 38) {
    event.preventDefault();
    lastDirection = "up";
  } else if (event.keyCode === 40) {
    event.preventDefault();
    lastDirection = "down";
    // } else if (event.keyCode === 32) {
    //   event.preventDefault();
    //   playGame("right");
  }
};

// main game:

starterBoard();
stratGame();
playGame("right");

function playGame() {
  space = false;
  interval = setInterval(function () {
    //move snake head:
    if (lastDirection === "right") {
      xSnakeHead += 20;
      if (xSnakeHead === 800) {
        xSnakeHead = 0;
      }
    } else if (lastDirection === "left") {
      xSnakeHead -= 20;
      if (xSnakeHead === -20) {
        xSnakeHead = 780;
      }
    } else if (lastDirection === "up") {
      ySnakeHead -= 20;
      if (ySnakeHead === -20) {
        ySnakeHead = 580;
      }
    } else if (lastDirection === "down") {
      ySnakeHead += 20;
      if (ySnakeHead == 600) {
        ySnakeHead = 0;
      }
    }
    ctx.fillStyle = "rgb(255,211,42)"; //yellow
    ctx.fillRect(xSnakeHead, ySnakeHead, 20, 20);
    if (isSnake(xSnakeHead, ySnakeHead)) {
      clearInterval(interval);
      clearInterval(clock);
      gameOver();
      endGame(interval);
    } else {
      snakeArr.push({ x: xSnakeHead, y: ySnakeHead });
      var amIAnApple = isApple(xSnakeHead, ySnakeHead);
      if (amIAnApple !== "-1") {
        eatingApples(amIAnApple, interval);
      } else {
        step();
      }
    }
  }, speed);
}

//timer function:
function timer() {
  var originTime = new Date().getTime();
  stopTime = false;
  clock = setInterval(function () {
    var now = new Date().getTime();
    var timePast = now - originTime;
    var hours = Math.floor(
      (timePast % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timePast % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timePast % (1000 * 60)) / 1000);
    var hoursText = document.getElementById("hours");
    var minutesText = document.getElementById("minutes");
    var secondsText = document.getElementById("seconds");
    if (hours < 10) {
      hoursText.innerText = "0" + hours;
    } else {
      hoursText.innerText = hours;
    }
    if (minutes < 10) {
      minutesText.innerText = "0" + minutes;
    } else {
      minutesText.innerText = minutes;
    }
    if (seconds < 10) {
      secondsText.innerText = "0" + seconds;
    } else {
      secondsText.innerText = seconds;
    }
    // if (stopTimeFlag) {
    //   stop = hours + ":" + minutes + ":" + seconds;
    //   clearInterval(clock);
    // }
  }, 1000);
}

// end game:
function gameOver() {
  gameOverEl.innerText = "Game Over";
  endTime = hours + ":" + minutes + ":" + seconds;
  endScore = score;
  modal.style.display = "block";
  tempWinner = { score: endScore, time: endTime };
  winnersArr.push(tempWinner);
  winnersArr = sorting(winnersArr);
  modal(winnersArr);
}

function endGame() {
  //clear memories
  console.log("end game");
  // clearInterval(interval);
  // clearInterval(clock);
  //reastarting all universal variables:
  baseFlag = true;
  xSnakeHead = 380;
  ySnakeHead = 280;
  snakeArr = [{ x: "380", y: "280" }];
  appleArr = [];
  lastDirection = "right";
  deleteFlag = true;
  score = 0;
  scoreLevel = 1;
  speed = 200;
}

//when restart is pressed:
document.getElementById("restart").addEventListener("click", function () {
  endGame();
  gameOverEl.innerText = "";
  starterBoard();
  stratGame();
  playGame(lastDirection);
});

function sorting(winnersArr) {
  tempArray = [];
  for (var i = 0; i < winnersArr.length; i++) {
    
  }
  return tempArray;
  function getTable(){
    var scores = JSON.parse(localStorage.getItem("playerList"));
    //console.log("getTable: ");
    //console.log(scores);
    //console.log(scores[6].name);
    if(winnersArr){
      winnersArr.sort(function (b, a){
            var scoreA = a.score;
            var scoreB = b.score;
            var timeA = a.time;
            var timeB = b.time;
    
            if (scoreA < scoreB) {
                return -1;
            }
            if (scoreA > scoreB) {
                return 1;
            }
            if(scoreA === scoreB){
                if (timeA < timeB) {
                    return 1;
                }
                if (timeA > timeB) {
                    return -1;
                }
            }
            return 0;
        });
        var scoreTable = document.getElementById("scoreTable");
        scoreTable.innerHTML = "<tr><th>name</th><th>score</th><th>time</th></tr>";
        for(var i = 0; i < scores.length; i++){
            var row = "<tr><td>"+ scores[i].name +"</td><td>"+ scores[i].score +"</td><td>"+ scores[i].time +"</td></tr>"
            scoreTable.innerHTML += row;
        }
    }
}
}
function modal(winnersArr) {
  var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}
