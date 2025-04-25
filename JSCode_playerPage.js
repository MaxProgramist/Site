const roomCode = localStorage.getItem("roomCode");

const playerListDiv = document.getElementById("playersGrid");
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
    playerBox.setAttribute('class', 'player_grid_item');

    playerBox.innerHTML += payload.rooms[roomCode].players[playerIndex].name;

    playerListDiv.appendChild(playerBox);
}

async function ChooseImage() {
    let payload = await LoadData();

    
}