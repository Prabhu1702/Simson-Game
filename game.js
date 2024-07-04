var buttonColours=["red","blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern = [];
var game_Start=false;
var level=0;

//1 [It is used to generate the pattern by the game ]
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

    var random_number = Math.floor(Math.random() * 4);
    var randomChosenColour=buttonColours[random_number];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);


}

//2 [It is used to take user output which colour the user pressed]
$(".btn").click( function (){
  var userChosenColour= $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
} )

//It is used to trigger the nextsequence() function basically it is used to start the game and update the heading
$(document).keypress(function(){
  if(!game_Start)
    {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
})

// It is used to add sound to the button pressed by both user and game itself
  function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

// It is used to animate the button when pressed by user by adding a class defined in css and removing it after 1000 milliseconds
  function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
            $("#" + currentColour).removeClass('pressed');
        }, 100);
  }

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
      console.log("true")
      if (userClickedPattern.length === gamePattern.length){

        
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
    }
    else {
      var audio = new Audio("sounds/" + "wrong" + ".mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200)

      $("#level-title").text("Game Over, Press Any Key to Restart ");
      startOver();
      

    }

}
function startOver(){
level=0;
gamePattern=[];
game_Start=false;
}

