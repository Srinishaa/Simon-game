var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var i = 0;
var start = false;
// mistakes i made were that i put lines 12,13,14 outside func nextSequence because of which my consecutive clicks
// where not stored in array.
function nextSequence() {
  i++;
  $("#level-title").text("Level " + i);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
    console.log(userClickedPattern.length);
  checkAnswer(userClickedPattern.length);

});

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);

}
$(document).keypress(function() {
  if (!start) {
    $("#level-title").text("Level " + i);
    nextSequence();
    start = true;
  }
});

function checkAnswer(currentLevel) {
  if (currentLevel== gamePattern.length) {
    if (JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    } else {
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      $("body").addClass("game-over");
      $("#level-title").text("Game over!Press any key to restart.");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
        restart();
    }
  }
}


function restart()
{
  start=false;
  i=0;
  gamePattern=[];
  userClickedPattern=[];

}
