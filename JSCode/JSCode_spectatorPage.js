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
    let isRoomAvailable = await GetFunctionResultFromServer("JSCode_index", "RoomAvailability");
    if (!isRoomAvailable) window.location.href = "index.html";

    let playersInRooms = await GetFunctionResultFromServer("JSCode_spectatorPage", "GetPlayers", [ROOM_CODE]);
    let maxCountOfTasks = await GetFunctionResultFromServer("JSCode_spectatorPage", "GetMaxCountOfTasks", [ROOM_CODE]);

    for (let i = 0; i < playersInRooms.length; i++)
        ChangePlayersScore(playersInRooms, i, maxCountOfTasks);
}

function ChangePlayersScore(playersInRooms, playerIndex, maxCountOfTasks) {
    let playerDiv = divToPlayer[playerIndex];

    let playerScore = playersInRooms[playerIndex].score;
    let playerSkin = playersInRooms[playerIndex].skin;
    
    let imgInsideDiv = playerDiv.querySelector("img");
    let pInsideDiv = playerDiv.querySelectorAll("p");
    imgInsideDiv.src = `./Icons/icon_${playerSkin}.png`;
    pInsideDiv[1].textContent = `${playerScore}/${maxCountOfTasks*100}`;
}

async function MakePlayersGroups() {
    let playersInRooms = await GetFunctionResultFromServer("JSCode_spectatorPage", "GetPlayers", [ROOM_CODE]);
    let maxCountOfTasks = await GetFunctionResultFromServer("JSCode_spectatorPage", "GetMaxCountOfTasks", [ROOM_CODE]);

    let usedPlayers = [];
    for (let i = 0; i < playersInRooms.length; i++) {
        if (usedPlayers.includes(i)) continue;

        NewPlayerIcon(playersInRooms, i, maxCountOfTasks);
        NewPlayerIcon(playersInRooms, playersInRooms[i].enemy, maxCountOfTasks);
        usedPlayers.push(i);
        usedPlayers.push(playersInRooms[i].enemy);
    }
}

function NewPlayerIcon(playersInRooms, playerIndex, maxCountOfTasks) {
    let playerBox = document.createElement("div");
    playerBox.setAttribute('class', 'admin_grid_item');

    let playerName = playersInRooms[playerIndex].name;
    let playerScore = playersInRooms[playerIndex].score;
    let playerSkin = playersInRooms[playerIndex].skin;

    let playerBoxSkinImage = document.createElement("img");
    playerBoxSkinImage.src = `./Icons/icon_${playerSkin}.png`;
    playerBoxSkinImage.setAttribute('class', 'universal_iconImage');

    let playerBoxProfile = document.createElement("div");

    let playerBoxName = document.createElement("p");
    playerBoxName.textContent = `${playerName}`;
    let playerBoxScore = document.createElement("p");
    playerBoxScore.textContent = `${playerScore}/${maxCountOfTasks*100}`;

    playerBoxProfile.appendChild(playerBoxName);
    playerBoxProfile.appendChild(playerBoxScore);

    playerBox.appendChild(playerBoxSkinImage);
    playerBox.appendChild(playerBoxProfile);

    divToPlayer[playerIndex] = playerBox;

    PLAYER_DIV_LIST.appendChild(playerBox);
}