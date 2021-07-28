const cells = document.querySelectorAll(".cell");
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", (event) => {
    console.log(event.target.id);
  });
}

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
    playerTwoInput.style.visibility = 'visible';
    aiCharacters.style.visibility = 'hidden';
  }
  function toggle_AI() {
    /* playerTwoInput.classList.add("hide"); */
    userOpponentChoice = "ai";
    /* aiCharacters.classList.remove("hide"); */
    playerTwoInput.style.visibility = 'hidden';
    aiCharacters.style.visibility = 'visible';
  }
  function openMenu() {
    modal.style.display = "flex";
  }
  return {
    closeMenu: closeMenu,
    toggle_PVP: toggle_PVP,
    toggle_AI: toggle_AI,
    openMenu: openMenu,
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

//-----------------
// Play Game
//-----------------
function playGame() {}

//-----------------
// Game Setup
//-----------------
function gameSetup() {
  const cells = document.getElementsByClassName("cell-content");
  const boardFill = ["X", "X", "O", "X", "O", "X", "O", "X", "O"];
  for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = boardFill[i];
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
