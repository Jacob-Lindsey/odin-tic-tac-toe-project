const cells = document.getElementsByClassName("cell-content");

//------------------------------------
// User storage array + Local Storage
//------------------------------------
const users = [];
window.localStorage.setItem("users", JSON.stringify(users));

//-----------------------
// UI Element References
//-----------------------
const modal = document.getElementById("new-game-modal");
const newGameButton = document.getElementById("new-game-button");
const modalClose = document.querySelector(".close");
const cb = document.getElementsByTagName("input");
const playerTwoInput = document.getElementById("playerTwo");
const aiCharacters = document.getElementById("choose-ai-opponent");
const choosePVP = document.getElementById("radio-one");
const chooseAI = document.getElementById("radio-two");
const loginButton = document.querySelector(".login");
const loginOverlay = document.getElementById("login-overlay");
const loginCard = document.getElementById("login");
const loginClose = document.querySelector(".close-button");
const modalOverlay = document.getElementById("modal-overlay");
const boardFill = ["X", "X", "O", "X", "O", "X", "O", "X", "O"];

//------------------------------------------------
// Returns Functionality Methods For UI Components
//------------------------------------------------
const displayController = (function () {
  let userOpponentChoice;
  function closeMenu() {
    modal.style.display = "none";
  }
  function toggle_PVP() {
    /* playerTwoInput.classList.remove("hide"); */
    userOpponentChoice = "pvp";
    /* aiCharacters.classList.add("hide"); */
    playerTwoInput.style.visibility = "visible";
    aiCharacters.style.visibility = "hidden";
  }
  function toggle_AI() {
    /* playerTwoInput.classList.add("hide"); */
    userOpponentChoice = "ai";
    /* aiCharacters.classList.remove("hide"); */
    playerTwoInput.style.visibility = "hidden";
    aiCharacters.style.visibility = "visible";
  }
  function openMenu() {
    modal.style.display = "flex";
  }

  function boardAnimation(arr, index) {
    if (index === arr.length) return;
    cells[index].textContent = arr[index];
    setTimeout(boardAnimation, 100, arr, index + 1);
  }
  return {
    closeMenu: closeMenu,
    toggle_PVP: toggle_PVP,
    toggle_AI: toggle_AI,
    openMenu: openMenu,
    boardAnimation: boardAnimation,
  };
})();

//----------------------------------------------------------------------------------
// Allows user to close New Game Modal or Login Card by clicking outside of element
//----------------------------------------------------------------------------------
loginButton.addEventListener("click", function () {
  loginOverlay.classList.remove("hide");
  loginCard.classList.remove("hide");
});

loginClose.addEventListener("click", function () {
  loginOverlay.classList.add("hide");
  loginCard.classList.add("hide");
});

loginOverlay.addEventListener("click", function () {
  loginOverlay.classList.add("hide");
  loginCard.classList.add("hide");
});

modalOverlay.addEventListener("click", function () {
  displayController.closeMenu();
  modalOverlay.classList.add("hide");
});

choosePVP.addEventListener("click", function () {
  displayController.toggle_PVP();
});
chooseAI.addEventListener("click", function () {
  displayController.toggle_AI();
});
newGameButton.addEventListener("click", function () {
  displayController.openMenu();
  modalOverlay.classList.remove("hide");
});
window.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    displayController.closeMenu();
    modalOverlay.classList.add("hide");
  }
  if (event.key == "n") {
    displayController.openMenu();
    modalOverlay.classList.remove("hide");
  }
});
modalClose.addEventListener("click", function () {
  displayController.closeMenu();
  modalOverlay.classList.add("hide");
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

function wait(ms) {
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

//--------------------
// Pre-Game Animation
//--------------------

const preGameAnimations = (function () {
  const cells = document.getElementsByClassName("cell");
  const requestAnimationFrame = window.requestAnimationFrame;
  let delay = 0;
  const randNums = generateRandomNumbers();
  function changeColor() {
    for (let i = 0; i < randNums.length; i++) {
      delay++;
      if (delay > 167) {
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
    for (let i = 0; i < 50; i++) {
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
  preGameAnimations.changeColor();

  /* displayController.boardAnimation(boardFill, 0); */
}

function clearBoard() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
}
//-----------------
// New Game
//-----------------
const newGame = (function () {
  // RUN GAME INSTANCE IN A WHILE LOOP => WHILE GAME ARRAY IS LESS THAN 9...

  function _privateMethod() {
    console.log(_privateProperty);
  }

  const gameBoard = document.getElementById("game-board");

  return {
    publicMethod: function () {
      _privateMethod();
    },
  };
})();

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

/* newGame.publicMethod(); */
