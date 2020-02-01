let rightPlayer;
let leftPlayer;
let hockeyBall;
let animinationStarts;
let scorePoints;

let leftPlayerScore = 0;
let rightPlayerScore = 0;

let scoreAtEndOfGame;
let canRestart = true;

let swapImages;
let swapped = false;
let gameEnded = false;

let timeOutEnds = [];

window.onload = function () {
    scoreAtEndOfGame = document.getElementById("scoreAtEndOfGame");
    let playButton = document.getElementById("play");
    let fullScreen = document.getElementById("fullScreen");
    scorePoints = document.getElementById("scorePoint");
    hockeyBall = document.getElementById("hockeyBall");
    rightPlayer = document.getElementById("rightPlayer");
    leftPlayer = document.getElementById("leftPlayer");

    swapImages = Math.floor(Math.random() * 2);
    if (swapImages == 1) {
        let temp = leftPlayer.attributes[3].nodeValue;
        leftPlayer.attributes[3].nodeValue = rightPlayer.attributes[3].nodeValue;
        rightPlayer.attributes[3].nodeValue = temp;
        hockeyBall.style.fill = "darkgreen";
        swapped = true;
    }
    animinationStarts = false;

    fullScreen.addEventListener('click', fullScreenToggle);
    playButton.addEventListener('click', playAnimations);
};

function fullScreenToggle() {
    if (document.fullscreenEnabled) {
        if (!document.fullscreenElement) {
            if (document.documentElement.requestFullscreen)
                document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}

function playAnimations() {
    if (canRestart == true && animinationStarts == false) {
        rightPlayer.style.animationPlayState = "running";
        timeOutEnds.push(setTimeout(PuckMoveThenLeftPlayer, 1000));
        animinationStarts = true;
    } else {
        gameEnded = true;
        canRestart = false;
        animinationStarts = false;
        hockeyBall.style.animationPlayState = "paused";
        rightPlayer.style.animationPlayState = "paused";
        leftPlayer.style.animationPlayState = "paused";
        EndGame();
        CheckWhoWins();
        clearTimeout(timeOutEnds);
        setTimeout(() => {
            scoreAtEndOfGame.style.visibility = "hidden";
            window.top.location = window.top.location;
            canRestart = true;
        }, 2000);
    }
}

function PuckMoveThenLeftPlayer() {
    if (animinationStarts == true) {
        hockeyBall.style.animationPlayState = "running";
        timeOutEnds.push(setTimeout(() => {
            leftPlayer.style.animationPlayState = "running";
            checkScoring();
        }, 500));
    }
}

function checkScoring() {
    timeOutEnds.push(setTimeout(() => {
        scorePoints.innerHTML = ++leftPlayerScore + " - " + rightPlayerScore;
        timeOutEnds.push(setTimeout(() => {
            scorePoints.innerHTML = leftPlayerScore + " - " + ++rightPlayerScore;
            timeOutEnds.push(setTimeout(checkScoring, 2500));
        }, 2200));
    }, 2300));
}

function EndGame() {
    for (let i = 0; i < timeOutEnds.length; i++) {
        clearTimeout(timeOutEnds[i]);
    }
}

function CheckWhoWins() {
    if (!swapped) {
        if (leftPlayerScore > rightPlayerScore) {
            scoreAtEndOfGame.innerHTML = "Orange Player Wins With " + leftPlayerScore + " Goals !!";
        } else if (rightPlayerScore > leftPlayerScore) {
            scoreAtEndOfGame.innerHTML = "Red Player Wins With " + RightPlayerScore + " Goals !!";
        } else {
            scoreAtEndOfGame.innerHTML = "This Ended as Draw !";
        }
    } else {
        if (leftPlayerScore > rightPlayerScore) {
            scoreAtEndOfGame.innerHTML = "Red Player Wins With " + leftPlayerScore + " Goals !!";
        } else if (rightPlayerScore > leftPlayerScore) {
            scoreAtEndOfGame.innerHTML = "Orange Player Wins With " + RightPlayerScore + " Goals !!";
        } else {
            scoreAtEndOfGame.innerHTML = "This Ended as Draw !";
        }
    }
    scoreAtEndOfGame.style.visibility = "visible";
}