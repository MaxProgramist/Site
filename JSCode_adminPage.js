const roomCode = localStorage.getItem("roomCode");

const codeTextField = document.getElementById("code");
const playerListDiv = document.getElementById("playersGrid");

codeTextField.innerText = "Code: " + roomCode;

var curentRoomPlayers = 0;

Loop();


async function Loop() {
    while (true) {
        await SomeAsyncFunction();
        await Delay(100);
    }
}

function Delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function SomeAsyncFunction() {
    let payload = await LoadData();

    if (payload.roomsCodes.length < 1) window.location.href = "index.html";

    while (payload.rooms[roomCode].players.length > curentRoomPlayers) {
        NewPlayerIcon(payload, curentRoomPlayers);
        curentRoomPlayers++;
    }
}

function NewPlayerIcon(payload, playerIndex) {
    let playerBox = document.createElement("div");
    playerBox.setAttribute('class', 'admin_grid_item');

    playerBox.innerHTML += payload.rooms[roomCode].players[playerIndex].name;

    playerListDiv.appendChild(playerBox);
}

async function StartGame() {
    let payload = await LoadData();

    if (payload.roomsCodes.length < 1) window.location.href = "index.html";
    if (payload.rooms[roomCode].players.length < 1)
        return PopUpWindowOfError("Count of players is to small (at least 2)");

    payload.rooms[roomCode].isActive = true;

    let playerList = [];
    for (let i = 0; i < payload.rooms[roomCode].players.length; i++) {
        playerList.push(i);
    }

    let usedPlayers = [];

    while (usedPlayers.length < payload.rooms[roomCode].players.length) {
        let randomInd = getRandomInt(0, payload.rooms[roomCode].players.length);
        while (usedPlayers.includes(randomInd) || playerList[0] == randomInd)
            randomInd = getRandomInt(0, payload.rooms[roomCode].players.length);

        payload.rooms[roomCode].players[playerList[0]].enemy = randomInd;
        payload.rooms[roomCode].players[randomInd].enemy = playerList[0];
        usedPlayers.push(randomInd);
        usedPlayers.push(playerList[0]);
        playerList.splice(0, 1);
        playerList.splice(playerList.indexOf(randomInd), 1);
    }

    await SaveData(payload);

    window.location.href = "spectatorPage.html";
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * max);
}
