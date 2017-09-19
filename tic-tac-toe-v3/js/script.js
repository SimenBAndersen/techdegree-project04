(function() {

  // Selectors
  const start = document.querySelector("#start");
  const board = document.querySelector("#board");
  const finish = document.querySelector("#finish");
  const startButton = document.querySelector("#start .button");
  const newGame = document.querySelector("#finish .button");
  const xImg = "url('img/x.svg')";
  const oImg = "url('img/o.svg')";
  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");
  const boxes = document.querySelector(".boxes");
  const box = document.querySelectorAll(".box");
  const message = document.querySelector(".message");
  
  // Keep track of the next player/turn
  // Will toggle between 1 and 2
  let whoIsNext = 1;
  player1.classList.add("active");

  // Disable the bord and finish HTML before game is started
  board.style.display = "none";
  finish.style.display = "none";

  // When the start game button is clicked: Switch from start to board screen
  startButton.onclick = function () {
    start.style.display = "none";
    board.style.display = "block";
  };

  // When the user hovers over an empty box: change the backgroundImage..
  // .. to the player's symbol
  boxes.onmouseover = function(event) {
    if (!event.target.classList.contains("box-filled-1") && !event.target.classList.contains("box-filled-2")) {
      event.target.style.backgroundImage = (whoIsNext == 1 ? oImg : xImg);
    }
  };

  // When the mouse leaves the empty box: change the background back to normal
  boxes.onmouseout = function(event) {
    if (!event.target.classList.contains("box-filled-1") && !event.target.classList.contains("box-filled-2")) {
      event.target.style.backgroundImage = "";
    }
  };

  // When a box is clicked: Fill it with the correct symbol of the player..
  // .. and change who's next
  boxes.onclick = function(event) {

    // Checks to see if the box is already filled
    if (!event.target.classList.contains("box-filled-1") && !event.target.classList.contains("box-filled-2")) {

      // Fills the box with the player's symbol
      event.target.classList.add("box-filled-" + whoIsNext);

      // Changes which player is next and the current active
      if (whoIsNext == 1) {
        player1.classList.remove("active");
        player2.classList.add("active");
        whoIsNext++;
      } else {
        player2.classList.remove("active");
        player1.classList.add("active");
        whoIsNext--;
      }
    }

    isGameWon();

  };

  // Display the winner screen
  function finishScreen() {
    board.style.display = "none";
    finish.style.display = "block";
  }

  // Check if the game is a draw
  function isGameDraw() {
    for (let i = 0; i < box.length; i++) {
      if (!box[i].classList.contains("box-filled-1") &&
          !box[i].classList.contains("box-filled-2")) {
            return true;
            if (i == box.length - 1) {
              return false;
            }
      }
    }
  }

  // Check if the game is over
  function isGameWon() {

    // All possible "3 in a row"
    let lines = [
      [0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[0,4,8],
			[1,4,7],
			[2,5,8],
			[2,4,6]
    ];

    for (let i = 0; i < lines.length; i++) {
      if (box[lines[i][0]].classList.contains("box-filled-1") &&
          box[lines[i][1]].classList.contains("box-filled-1") &&
          box[lines[i][2]].classList.contains("box-filled-1")) {

            // Display the winner screen
            finishScreen();
            finish.classList.add("screen-win-one")
            message.innerHTML = "Winner";
            return;
      }
      else if (box[lines[i][0]].classList.contains("box-filled-2") &&
               box[lines[i][1]].classList.contains("box-filled-2") &&
               box[lines[i][2]].classList.contains("box-filled-2")) {

                 // Display the winner screen
                 finishScreen();
                 finish.classList.add("screen-win-two")
                 message.innerHTML = "Winner";
                 return;

      } else if (!isGameDraw()) {
        console.log("Draw");
        finishScreen();
        finish.classList.add("screen-win-tie")
        message.innerHTML = "It's a tie!";

      } else {
        console.log("Game is not over yet");
      }
    }
  }

  newGame.onclick = function() {
    console.log("is clicked");
    for (let i = 0; i < box.length; i++) {
      box[i].classList.remove("box-filled-1", "box-filled-2");
      box[i].style.backgroundImage = "";
    }

    finish.classList.remove("screen-win-tie", "screen-win-one",
                            "screen-win-two");

    finish.style.display = "none";
    board.style.display = "block";
  };

}());
