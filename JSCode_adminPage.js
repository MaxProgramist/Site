const ROOM_CODE = localStorage.getItem("roomCode");

const CODE_TEXTFIELD = document.getElementById("code");
const PLAYER_DIV_LIST = document.getElementById("playersGrid");

CODE_TEXTFIELD.innerText = "Code: " + ROOM_CODE;

var currentRoomPlayers = 0;

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

    while (payload.rooms[ROOM_CODE].players.length > currentRoomPlayers) {
        NewPlayerIcon(payload, currentRoomPlayers);
        currentRoomPlayers++;
    }
}

function NewPlayerIcon(payload, playerIndex) {
    let playerBox = document.createElement("div");
    playerBox.setAttribute('class', 'admin_grid_item');

    playerBox.innerHTML += payload.rooms[ROOM_CODE].players[playerIndex].name;

    PLAYER_DIV_LIST.appendChild(playerBox);
}

async function StartGame() {
    let payload = await LoadData();

    if (payload.roomsCodes.length < 1) window.location.href = "index.html";
    if (payload.rooms[ROOM_CODE].players.length < 1)
        return PopUpWindowOfError("Count of players is to small (at least 2)");

    payload.rooms[ROOM_CODE].isActive = true;

    let playerList = [];
    for (let i = 0; i < payload.rooms[ROOM_CODE].players.length; i++) {
        playerList.push(i);
    }

    let usedPlayers = [];

    while (usedPlayers.length < payload.rooms[ROOM_CODE].players.length) {
        let randomInd = getRandomInt(0, payload.rooms[ROOM_CODE].players.length);
        while (usedPlayers.includes(randomInd) || playerList[0] == randomInd)
            randomInd = getRandomInt(0, payload.rooms[ROOM_CODE].players.length);

        payload.rooms[ROOM_CODE].players[playerList[0]].enemy = randomInd;
        payload.rooms[ROOM_CODE].players[randomInd].enemy = playerList[0];
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
