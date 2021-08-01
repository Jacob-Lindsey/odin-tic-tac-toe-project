//-----------------------
// DOM Element References
//-----------------------
const displayElement = (function () {
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
  const playerOneInput = document.getElementById("playerOne");
  const playerTwoInput = document.getElementById("playerTwo");
  const replayButton = document.querySelector(".replay");
  const applyButton = document.querySelector(".submit");

  return {
    aiCharacters,
    boardFill,
    cb,
    cells,
    chooseAI,
    choosePVP,
    loginButton,
    loginCard,
    loginClose,
    loginOverlay,
    modal,
    modalClose,
    modalOverlay,
    newGameButton,
    playerOneInput,
    playerTwoInput,
    replayButton,
    applyButton,
  };
})();

//------------------------------------------------
// Returns Functionality Methods For UI Components
//------------------------------------------------
const displayController = (function () {
  let userOpponentChoice;

  function closeMenu() {
    displayElement.modal.style.display = "none";
    displayElement.modalOverlay.classList.add("hide");
  }
  function openMenu() {
    displayElement.modal.style.display = "flex";
    displayElement.modalOverlay.classList.remove("hide");
  }
  function closeLogin() {
    displayElement.loginOverlay.classList.add("hide");
    displayElement.loginCard.classList.add("hide");
  }
  function openLogin() {
    displayElement.loginOverlay.classList.remove("hide");
    displayElement.loginCard.classList.remove("hide");
  }
  function toggle_PVP() {
    userOpponentChoice = "pvp";
    displayElement.playerTwoInput.style.visibility = "visible";
    displayElement.aiCharacters.style.visibility = "hidden";
    gameLogicController.aiPlaying = false;
  }
  function toggle_AI() {
    userOpponentChoice = "ai";
    displayElement.playerTwoInput.style.visibility = "hidden";
    displayElement.aiCharacters.style.visibility = "visible";
    gameLogicController.aiPlaying = true;
  }
  function boardAnimation(arr, index) {
    if (index === arr.length) return;
    displayElement.cells[index].textContent = arr[index];
    setTimeout(boardAnimation, 100, arr, index + 1);
  }
  function registerUser() {
    if (!gameLogicController.aiPlaying) {
      if (displayElement.playerTwoInput.value != "") {
        const playerTwo = displayElement.playerTwoInput.value;
        createUser(`${playerTwo}`, "/images/avatar.png", "");
        winLossRecord.setInitialRecord(`${playerTwo}`);
      } else {
        alert("Please enter Player 2's name.");
      }
    }
    if (displayElement.playerOneInput.value != "") {
      const playerOne = displayElement.playerOneInput.value;
      createUser(`${playerOne}`, "/images/avatar.png", "");
      winLossRecord.setInitialRecord(`${playerOne}`);
    } else {
      alert("Please enter Player 1's name.");
    }
  }

  return {
    closeMenu: closeMenu,
    openMenu: openMenu,
    closeLogin: closeLogin,
    openLogin: openLogin,
    toggle_PVP: toggle_PVP,
    toggle_AI: toggle_AI,
    boardAnimation: boardAnimation,
    registerUser: registerUser,
  };
})();


const UIeventListeners = (function () {
  //----------------------------------------------------------------------------------
  // Allows user to close New Game Modal or Login Card by clicking outside of element
  //----------------------------------------------------------------------------------

  displayElement.loginButton.addEventListener("click", function () {
    displayController.openLogin();
    displayController.closeMenu();
  });
  displayElement.loginClose.addEventListener("click", function () {
    displayController.closeLogin();
  });
  displayElement.loginOverlay.addEventListener("click", function () {
    displayController.closeLogin();
  });
  displayElement.modalClose.addEventListener("click", function () {
    displayController.closeMenu();
  });
  displayElement.modalOverlay.addEventListener("click", function () {
    displayController.closeMenu();
  });
  displayElement.newGameButton.addEventListener("click", function () {
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
  displayElement.choosePVP.addEventListener("click", function () {
    displayController.toggle_PVP();
  });
  displayElement.chooseAI.addEventListener("click", function () {
    displayController.toggle_AI();
  });

  window.addEventListener("keydown", function (event) {
    if (event.key == "p") {
      playGame();
    }
  });
  displayElement.replayButton.addEventListener("click", function () {
    playGame();
  });
  displayElement.applyButton.addEventListener("click", function () {
    displayController.registerUser();
  });
})();


//---------------------
// Pre-Game Animations
//---------------------
const preGameAnimations = (function () {
  const cells = document.getElementsByClassName("cell");
  const requestAnimationFrame = window.requestAnimationFrame;
  let delay = 0;
  let flag = true;
  const randNums = generateRandomNumbers();
  function changeColor() {
    displayElement.replayButton.addEventListener("click", () => {
      flag = false;
    });
    for (let i = 0; i < randNums.length; i++) {
      if (flag == false) {
        for (let i = 0; i < cells.length; i++) {
          cells[i].style.backgroundColor = "rgb(48,48,48)";
        }
        return;
      }
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
    if (event.target.classList.contains("cell-content")) {
      console.log(event.target.id);
      gameLogicController.squareClicked(event.target.id);
    }
  });
}

//------------------
// Used for testing
//------------------
/* function clearBoard() {
  for (let i = 0; i < displayElement.length; i++) {
    displayElement.cells[i].textContent = "";
  }
} */


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
        if (currentPlayer === aiPlayer) {
          winLossRecord.updateRecord(1, Human);
          winLossRecord.updateRecord(0, CPU);
          setTimeout(function () {
            alert("You lost. Would you like to play again?");
            window.location = window.location;
            gameSetup();
          }, 10);
        } else {
          winLossRecord.updateRecord(0, Human);
          winLossRecord.updateRecord(1, CPU);
          setTimeout(function () {
            alert("You won. Would you like to play again?");
            window.location = window.location;
            gameSetup();
          }, 10);
        }
      } else {
        winLossRecord.updateRecord(2, Human);
        winLossRecord.updateRecord(2, CPU);
        setTimeout(function () {
          alert(
            "Game Over. No More Spaces Left. Would you like to play again?"
          );
          window.location = window.location;
          gameSetup();
        }, 10);
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
      document.getElementById("" + i).innerHTML = text;
    }
  }

  const AI = (function () {
    const playingSequence = [4, 0, 2, 6, 8, 1, 3, 5, 7];

    function play() {
      const move = decideBestMove();
      makeMove(move, aiPlayer);
    }

    function decideBestMove() {
      //----------------------------------------------------------
      // Play a win move if there is one, else block the opponent
      // if possible, else play according to sequence.
      //-----------------------------------------------------------
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
    //--------
    // Static
    //--------
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

    //-------------
    // Constructor
    //-------------
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

      //--------
      // Public
      //--------
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

  return {
    onLoad: onLoad,
    squareClicked: squareClicked,
    board: board,
    aiPlaying: aiPlaying,
    aiPlayer: aiPlayer,
  };
})();

//------------------------------------------------------------------
// Records the Result of the Game       ****NOT FUNCTIONAL YET*****
//------------------------------------------------------------------
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
    const recordArray = JSON.parse(
      window.localStorage.getItem(`${player.userName}`)
    );
    playerName.textContent = player.userName;
    playerRecord.textContent =
      recordArray[0] + " - " + recordArray[1] + " - " + recordArray[2];
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
function createUser(userName, avatar, record) {
  return {
    userName: userName,
    avatar: avatar,
    record: record,
  };
}

//------------------------------------
// User storage array + Local Storage
//------------------------------------
const winLossRecord = (function () {
  function updateRecord(result, player) {
    let json = window.localStorage.getItem(`${player.userName}`);
    let record;
    if (json) {
      record = JSON.parse(json);
      console.log(record[0]);
      record[result] += 1;
    } else {
      record = [0, 0, 0];
    }
    player.record = record;
    window.localStorage.setItem(player.userName, JSON.stringify(record));
  }
  
  function setInitialRecord(player) {
    let json = window.localStorage.getItem(`${player.userName}`);
    let record;
    if (json) {
      record = JSON.parse(json);
    } else {
      record = [0, 0, 0];
    }
    player.record = record;
    window.localStorage.setItem(`${player.userName}`, JSON.stringify(record));
  }
  
  return {
    updateRecord: updateRecord,
    setInitialRecord: setInitialRecord,
  };
})();

//------------------------------------------------------
// Default User Objects and Initializations for Testing 
//------------------------------------------------------
const Human = createUser("Human", "/images/avatar.png", "");
const CPU = createUser("CPU", "/images/avatar.png", "");

winLossRecord.setInitialRecord(Human);
winLossRecord.setInitialRecord(CPU);

buildUI(Human, CPU);
preGameAnimations.changeColor();


//---------------------------
//  Module References
//---------------------------
//---------------------------
//  Public-Scoped Functions:
//    ---displayController---
//         closeLogin
//         openLogin
//         closeMenu
//         openMenu
//         toggle_PVP
//         toggle_AI
//         boardAnimation
//    ---preGameAnimations---
//         changeColor
//     --gameLogicController--
//         onLoad
//         squareClicked
//    ------constr------
//         getSquares
//    ----winLossRecord----
//         updateRecord
//       setInitialRecord
//---------------------------
//---------------------------
//  Public-Scoped Variables:
// ------displayElement------
//         aiCharacters
//         boardFill
//         cb
//         cells
//         chooseAI
//         choosePVP
//         loginButton
//         loginCard
//         loginClose
//         loginOverlay
//         modal
//         modalClose
//         modalOverlay
//         newGameButton
//         playerOneInput
//         playerTwoInput
//         replayButton
//         applyButton
//    ---preGameAnimations---
//         randNums
//         cells
//    ---displayController---
//         squareAvailable
//         isWin
//         isEndGame
//         setSquare
//         clone
//         getAvailablePositions
//   ---gameLogicController---
//         aiPlaying
//         aiPlayerPLAYPLAY
//---------------------------
