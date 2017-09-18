(function() {

  // Selectors
  const start = document.querySelector("#start");
  const board = document.querySelector("#board");
  const finish = document.querySelector("#finish");
  const startButton = document.querySelector("#start .button");

  // Disable the bord and finish HTML before game is started
  board.style.display = "none";
  finish.style.display = "none";

  // When the start game button is clicked: Switch from start to boards screen
  startButton.onclick = function () {
    start.style.display = "none";
    board.style.display = "block";
  };

}());
