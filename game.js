
let level = 0;
let gameStarted = false;

let gamePattern = [];
let userClickedPattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

// Start Game
$(window).keypress(function(event) {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    
    let randomButton = $("#" + randomChosenColour);
    randomButton.fadeIn(100).fadeOut(100).fadeIn(100);

    animatePress(randomChosenColour);
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
}

$(".btn").click(function(e) {
    $(this).fadeOut(100).fadeIn(100);
    let userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(colour) {
    let audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    let btn = $("#" + currentColour);
    btn.addClass("pressed");
    setTimeout(() => {
        btn.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}







