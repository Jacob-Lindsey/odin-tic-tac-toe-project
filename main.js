//------------------------------------
// User storage array + Local Storage
//------------------------------------
const users = [];
window.localStorage.setItem("users", JSON.stringify(users));

//-----------------------
// UI Element References
//-----------------------
const aiCharacters = document.getElementById("choose-ai-opponent");
const boardFill = ["X", "X", "O", "X", "O", "X", "O", "X", "O"];
const cb = document.getElementsByTagName("input");
const cells = document.getElementsByClassName("cell-content");
const chooseAI = document.getElementById("radio-two");
const choosePVP = document.getElementById("radio-one");
const loginButton = document.querySelector(".login");
const loginCard = document.getElementById("login");
const loginClose = document.querySelector(".close-button");
const loginOverlay = document.getElementById("login-overlay");
const modal = document.getElementById("new-game-modal");
const modalClose = document.querySelector(".close");
const modalOverlay = document.getElementById("modal-overlay");
const newGameButton = document.getElementById("new-game-button");
const playerTwoInput = document.getElementById("playerTwo");

//----------------------------------------
// Game Board Element Specific References
//----------------------------------------

//------------------------------------------------
// Returns Functionality Methods For UI Components
//------------------------------------------------
const displayController = (function () {
  let userOpponentChoice;

  function closeMenu() {
    modal.style.display = "none";
    modalOverlay.classList.add("hide");
  }
  function openMenu() {
    modal.style.display = "flex";
    modalOverlay.classList.remove("hide");
  }
  function closeLogin() {
    loginOverlay.classList.add("hide");
    loginCard.classList.add("hide");
  }
  function openLogin() {
    loginOverlay.classList.remove("hide");
    loginCard.classList.remove("hide");
  }
  function toggle_PVP() {
    userOpponentChoice = "pvp";
    playerTwoInput.style.visibility = "visible";
    aiCharacters.style.visibility = "hidden";
  }
  function toggle_AI() {
    userOpponentChoice = "ai";
    playerTwoInput.style.visibility = "hidden";
    aiCharacters.style.visibility = "visible";
  }
  function boardAnimation(arr, index) {
    if (index === arr.length) return;
    cells[index].textContent = arr[index];
    setTimeout(boardAnimation, 100, arr, index + 1);
  }
  return {
    closeMenu: closeMenu,
    openMenu: openMenu,
    closeLogin: closeLogin,
    openLogin: openLogin,
    toggle_PVP: toggle_PVP,
    toggle_AI: toggle_AI,
    boardAnimation: boardAnimation,
  };
})();

//----------------------------------------------------------------------------------
// Allows user to close New Game Modal or Login Card by clicking outside of element
//----------------------------------------------------------------------------------
loginButton.addEventListener("click", function () {
  displayController.openLogin();
  displayController.closeMenu();
});
loginClose.addEventListener("click", function () {
  displayController.closeLogin();
});
loginOverlay.addEventListener("click", function () {
  displayController.closeLogin();
});
modalClose.addEventListener("click", function () {
  displayController.closeMenu();
});
modalOverlay.addEventListener("click", function () {
  displayController.closeMenu();
});
newGameButton.addEventListener("click", function () {
  displayController.openMenu();
  displayController.closeLogin();
});

//-----------------------------------------------
// Open menu with "N" - Close menu with 'Escape'
//-----------------------------------------------
window.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    displayController.closeMenu();
    displayController.closeLogin();
  }
  if (event.key == "n") {
    displayController.openMenu();
  }
});

//---------------------------------------------------
// Toggles the opponent selection between PvP and AI
//---------------------------------------------------
choosePVP.addEventListener("click", function () {
  displayController.toggle_PVP();
});
chooseAI.addEventListener("click", function () {
  displayController.toggle_AI();
});

window.addEventListener("keydown", function (event) {
  if (event.key == "p") {
    playGame();
  }
});
window.addEventListener("keydown", function (event) {
  if (event.key == "c") {
    clearBoard();
  }
});

//---------------------
// Pre-Game Animations
//---------------------
const preGameAnimations = (function () {
  const cells = document.getElementsByClassName("cell");
  const requestAnimationFrame = window.requestAnimationFrame;
  let delay = 0;
  const randNums = generateRandomNumbers();
  function changeColor() {
    for (let i = 0; i < randNums.length; i++) {
      delay++;
      if (delay > 1550) {
        cells[randNums[i]].style.backgroundColor = getRandomColor();
        delay = 0;
      }
    }

    requestAnimationFrame(changeColor);
  }

  function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let hexR = r.toString(16);
    let hexG = g.toString(16);
    let hexB = b.toString(16);

    if (hexR.length == 1) {
      hexR = "0" + hexR;
    }
    if (hexG.length == 1) {
      hexG = "0" + hexG;
    }
    if (hexB.length == 1) {
      hexB = "0" + hexB;
    }

    const hexColor = "#" + hexR + hexG + hexB;
    return hexColor.toUpperCase();
  }

  function generateRandomNumbers() {
    let randomNumbers = [];
    for (let i = 0; i < 350; i++) {
      let r = Math.floor(Math.random() * 9);
      randomNumbers.push(r);
    }
    return randomNumbers;
  }

  return {
    changeColor: changeColor,
    randNums: randNums,
    cells: cells,
  };
})();

//-----------------
// Play Game
//-----------------
function playGame() {
  gameSetup();
}

//-----------------
// Game Setup
//-----------------
function gameSetup() {
  gameLogicController.onLoad();
  window.addEventListener("click", function (event) {
    if (event.target.classList.contains('cell-content')) {
      console.log(event.target.id);
      gameLogicController.squareClicked(event.target.id);
    }
  })
  /* preGameAnimations.changeColor(); */
}

function clearBoard() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
}

//----------
// New Game
//----------
const newGame = (function () {
  // RUN GAME INSTANCE IN A WHILE LOOP => WHILE GAME ARRAY IS LESS THAN 9...

  function _privateMethod() {
    console.log(_privateProperty);
  }

  return {
    publicMethod: function () {
      _privateMethod();
    },
  };
})();

//------------
// Game Logic
//------------
const gameLogicController = (function () {
  const gameBoard = document.getElementById("game-board");
  let board;
  const aiPlaying = true;
  const aiPlayer = "X";

  let currentPlayer = "O";

  function onLoad() {
    board = new Board();
    updateGridDisplay();
  }

  function squareClicked(squareId) {
    if (board.squareAvailable(squareId)) {
      makeMove(squareId, currentPlayer);
    } else {
      alert("that square has been taken, please choose a different one :)");
    }
  }

  function makeMove(squareId, player) {
    board.setSquare(squareId, player);
    updateGridDisplay();
    endTurn();
  }

  function endTurn() {
    if (board.isEndGame()) {
      if (board.isWin()) {
        alert(
          "GAME OVER!!! player " +
            currentPlayer +
            " WINS!!! - hope you had fun :)"
        );
      } else {
        alert("GAME OVER!!! No more spaces left :( Hope you had fun ;)");
      }
    } else {
      currentPlayer = otherPlayer();
      if (aiPlaying && currentPlayer === aiPlayer) {
        AI.play();
      }
    }
  }

  function otherPlayer() {
    return {
      X: "O",
      O: "X",
    }[currentPlayer];
  }

  function updateGridDisplay() {
    for (let i = 0; i < 9; i++) {
      const squareValue = board.getSquares()[i].getValue();
      const text = squareValue || "-";
      document.getElementById('' + i).innerHTML = text;
    }
  }

  const AI = (function () {
    const playingSequence = [4, 0, 2, 6, 8, 1, 3, 5, 7];

    function play() {
      const move = decideBestMove();
      makeMove(move, aiPlayer);
    }

    function decideBestMove() {
      // Play a win move if there is one, else block the opponent
      // if possible, else play according to sequence.

      const availablePositions = board.getAvailablePositions();

      const winMoves = availablePositions.filter(function (pos) {
        return playerWouldWin(currentPlayer, pos);
      });

      const blockMoves = availablePositions.filter(function (pos) {
        return playerWouldWin(otherPlayer(), pos);
      });

      const allMoves = playingSequence.filter(function (pos) {
        return availablePositions.indexOf(pos) !== -1;
      });

      if (winMoves.length) {
        return winMoves[0];
      } else if (blockMoves.length) {
        return blockMoves[0];
      } else {
        return allMoves[0];
      }
    }

    function playerWouldWin(player, position) {
      const clone = board.clone();
      clone.setSquare(position, player);
      return clone.isWin();
    }

    return {
      play: play,
    };
  })();

  const Board = (function () {
    // Static

    const STRAIGHTS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    function makeEmptySquares() {
      const arr = [];
      for (i = 0; i < 9; i++) {
        arr.push(new Square());
      }
      return arr;
    }

    // Constructor
    const constr = function (squares) {
      const mySquares = squares || makeEmptySquares();

      function squareAvailable(squareId) {
        return mySquares[squareId].isAvailable();
      }

      function isEndGame() {
        return isWin() || allSquaresTaken();
      }

      function allSquaresTaken() {
        return mySquares.every(function (square) {
          return !square.isAvailable();
        });
      }

      function isWin(board) {
        return STRAIGHTS.some(straightWins);
      }

      function straightWins(straight) {
        const sq0 = mySquares[straight[0]];
        const sq1 = mySquares[straight[1]];
        const sq2 = mySquares[straight[2]];

        return (
          sq0.getValue() === sq1.getValue() &&
          sq1.getValue() === sq2.getValue() &&
          !sq0.isAvailable()
        );
      }

      function setSquare(squareId, playerId) {
        mySquares[squareId].setValue(playerId);
      }

      function clone() {
        const clonedSquares = [];
        for (let i = 0; i < 9; i++) {
          clonedSquares[i] = mySquares[i].clone();
        }
        return new Board(clonedSquares);
      }

      function getAvailablePositions() {
        const arr = [];
        mySquares.forEach(function (square, index) {
          if (square.isAvailable()) {
            arr.push(index);
          }
        });
        return arr;
      }

      // Public
      this.squareAvailable = squareAvailable;
      this.isWin = isWin;
      this.isEndGame = isEndGame;
      this.setSquare = setSquare;
      this.clone = clone;
      this.getAvailablePositions = getAvailablePositions;
      this.getSquares = function () {
        return mySquares;
      };
    };

    return constr;
  })();

  function Square(value) {
    let myValue = value || null;

    function isAvailable() {
      return myValue === null;
    }

    // Public
    this.isAvailable = isAvailable;
    this.getValue = function () {
      return myValue;
    };
    this.setValue = function (v) {
      myValue = v;
    };
    this.clone = function () {
      return new Square(myValue);
    };
  }

  // Public GAME object
  return {
    onLoad: onLoad,
    squareClicked: squareClicked,
  };
})();

//--------------------------------
// Records the Result of the Game
//--------------------------------
function recordGameResult(playerOne, playerTwo, result) {
  const timeStamp = new Date().getTime();
  return {
    playerOne: playerOne,
    playerTwo: playerTwo,
    result: result,
    timeStamp: timeStamp,
  };
}

//-----------------
// UI Construction
//-----------------
function buildUI(playerOne, playerTwo) {
  const playerOneDisplay = document.querySelector(".left");
  const playerTwoDisplay = document.querySelector(".right");

  function createElements(player, side) {
    const playerContainer = document.createElement("div");
    const playerName = document.createElement("div");
    const playerAvatar = document.createElement("img");
    const playerRecord = document.createElement("div");
    playerName.textContent = player.userName;
    playerRecord.textContent =
      player.record[0] + " - " + player.record[1] + " - " + player.record[2];
    playerContainer.classList.add("player-container");
    playerName.classList.add("player-name");
    if (side == "left") {
      playerName.classList.add("player-left");
    } else if (side == "right") {
      playerName.classList.add("player-right");
    }
    playerAvatar.classList.add("player-avatar");
    playerAvatar.src = `${player.avatar}`;
    playerRecord.classList.add("player-record");
    playerContainer.appendChild(playerName);
    playerContainer.appendChild(playerAvatar);
    playerContainer.appendChild(playerRecord);
    return playerContainer;
  }
  playerOneDisplay.appendChild(createElements(playerOne, "left"));
  playerTwoDisplay.appendChild(createElements(playerTwo, "right"));
}

//---------------------------
// Returns A New User Object
//---------------------------
function createUser(userName, avatar) {
  return {
    userName: userName,
    avatar: avatar,
    record: [0, 0, 0],
    addUserToDB() {
      let user = {
        userName,
        avatar,
        record: [0, 0, 0],
      };
      users.push(user);
    },
  };
}

const pantzzzz = createUser("pantzzzz", "https://i.pravatar.cc/120");
const cpu = createUser("CPU", "https://i.pravatar.cc/121");

buildUI(pantzzzz, cpu);

//---------------------------
//  Module References
//---------------------------
//---------------------------
//  Public-Scoped Functions:
//    -- displayController --
//         closeLogin
//         openLogin
//         closeMenu
//         openMenu
//         toggle_PVP
//         toggle_AI
//         boardAnimation
//    -- preGameAnimations --
//         changeColor
//    -- gameLogicController --
//         onLoad
//         squareClicked
//---------------------------
//---------------------------
//  Public-Scoped constiables:
//    -- preGameAnimations --
//         randNums
//         cells
//    -- displayController --
//         squareAvailable
//         isWin
//         isEndGame
//         setSquare
//         clone
//         getAvailablePositions
//         getSquares
//---------------------------
