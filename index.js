var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickPattern = [];
var level = 0;
var gameStarted = false;
$(document).keydown(function () {
    if (!gameStarted) {
        $("#level-title").text("Level" + level);
        nextSequence();
        gameStarted = true;
    }
});

function nextSequence() {
    userClickPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChoseColor = buttonColors[randomNumber];

    gamePattern.push(randomChoseColor);
    $("#" + randomChoseColor)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomChoseColor)
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    //console.log("User clicked pattern: ", userClickPattern);

    checkAnswer(userClickPattern.length - 1);

});

function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel] == gamePattern[currentLevel]) {

        // console.log("success");

        if (userClickPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        //console.log("wrong");

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game over, Press Any Key to Restart");
        startOver();
    }
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}



