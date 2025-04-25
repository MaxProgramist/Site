const roomCode = localStorage.getItem("roomCode");

const playerListDiv = document.getElementById("playersGrid");

let divToPlayer = [];

MakePlayersGroups();
Loop();

//

async function Loop() {
    while (true) {
        await SomeAsyncFunction();
        await Delay(1000);
    }
}

function Delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function SomeAsyncFunction() {
    let payload = await LoadData();

    if (payload.roomsCodes.length < 1) window.location.href = "index.html";

    for (let i = 0; i < payload.rooms[roomCode].players.length; i++)
        ChagePlayersScore(payload, i);
}

function ChagePlayersScore(payload, playerIndex) {
    let playerDiv = divToPlayer[playerIndex];

    let playerName = payload.rooms[roomCode].players[playerIndex].name;
    let playerScore = payload.rooms[roomCode].players[playerIndex].score;
    playerDiv.innerHTML = `${playerName} <br> Рахунок: ${playerScore}/800`;
}

async function MakePlayersGroups() {
    let payload = await LoadData();

    if (payload.roomsCodes.length < 1) window.location.href = "index.html";

    let usedPlayers = [];
    for (let i = 0; i < payload.rooms[roomCode].players.length; i++) {
        if (usedPlayers.includes(i)) continue;

        NewPlayerIcon(payload, i);
        NewPlayerIcon(payload, payload.rooms[roomCode].players[i].enemy);
        usedPlayers.push(i);
        usedPlayers.push(payload.rooms[roomCode].players[i].enemy);
    }
}

function NewPlayerIcon(payload, playerIndex) {
    let playerBox = document.createElement("div");
    playerBox.setAttribute('class', 'admin_grid_item');

    let playerName = payload.rooms[roomCode].players[playerIndex].name;
    let playerScore = payload.rooms[roomCode].players[playerIndex].score;
    playerBox.innerHTML += `${playerName} <br> Рахунок ${playerScore}`;

    divToPlayer[playerIndex] = playerBox;

    playerListDiv.appendChild(playerBox);
}