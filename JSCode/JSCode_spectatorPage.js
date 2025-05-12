const ROOM_CODE = sessionStorage.getItem("roomCode");

const PLAYER_DIV_LIST = document.getElementById("playersGrid");

let divToPlayer = [];

MakePlayersGroups();
Loop();


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

    for (let i = 0; i < payload.rooms[ROOM_CODE].players.length; i++)
        ChangePlayersScore(payload, i);
}

function ChangePlayersScore(payload, playerIndex) {
    let playerDiv = divToPlayer[playerIndex];

    let playerScore = payload.rooms[ROOM_CODE].players[playerIndex].score;
    let playerSkin = payload.rooms[ROOM_CODE].players[playerIndex].skin;
    
    let imgInsideDiv = playerDiv.querySelector("img");
    let pInsideDiv = playerDiv.querySelectorAll("p");
    imgInsideDiv.src = `./Icons/icon_${playerSkin}.png`;
    pInsideDiv[1].textContent = `${playerScore}/${payload.rooms[ROOM_CODE].maxCountOfTasks*100}`;
}

async function MakePlayersGroups() {
    let payload = await LoadData();

    if (payload.roomsCodes.length < 1) window.location.href = "index.html";

    let usedPlayers = [];
    for (let i = 0; i < payload.rooms[ROOM_CODE].players.length; i++) {
        if (usedPlayers.includes(i)) continue;

        NewPlayerIcon(payload, i);
        NewPlayerIcon(payload, payload.rooms[ROOM_CODE].players[i].enemy);
        usedPlayers.push(i);
        usedPlayers.push(payload.rooms[ROOM_CODE].players[i].enemy);
    }
}

function NewPlayerIcon(payload, playerIndex) {
    let playerBox = document.createElement("div");
    playerBox.setAttribute('class', 'admin_grid_item');

    let playerName = payload.rooms[ROOM_CODE].players[playerIndex].name;
    let playerScore = payload.rooms[ROOM_CODE].players[playerIndex].score;
    let playerSkin = payload.rooms[ROOM_CODE].players[playerIndex].skin;

    let playerBoxSkinImage = document.createElement("img");
    playerBoxSkinImage.src = "./Icons/icon_0.png";
    playerBoxSkinImage.setAttribute('class', 'universal_iconImage');

    let playerBoxProfile = document.createElement("div");

    let playerBoxName = document.createElement("p");
    playerBoxName.textContent = `${playerName}`;
    let playerBoxScore = document.createElement("p");
    playerBoxScore.textContent = `${playerScore}/${payload.rooms[ROOM_CODE].maxCountOfTasks*100}`;

    playerBoxProfile.appendChild(playerBoxName);
    playerBoxProfile.appendChild(playerBoxScore);

    playerBox.appendChild(playerBoxSkinImage);
    playerBox.appendChild(playerBoxProfile);

    divToPlayer[playerIndex] = playerBox;

    PLAYER_DIV_LIST.appendChild(playerBox);
}