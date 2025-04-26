const ROOM_CODE = localStorage.getItem("roomCode");
const THIS_PLAYER_INDEX = localStorage.getItem("playerIndex");

const PLAYER_DIV_LIST = document.getElementById("playersGrid");
const CHOOSE_IMAGE_GRID = document.getElementById("chooseImageGrid");
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
    playerBox.setAttribute('class', 'player_grid_item');

    playerBox.innerHTML += payload.rooms[ROOM_CODE].players[playerIndex].name;

    PLAYER_DIV_LIST.appendChild(playerBox);
}

async function ChooseImage() {
    let payload = await LoadData();

    if (CHOOSE_IMAGE_GRID.style.display === "none")
        CHOOSE_IMAGE_GRID.style.display = "grid";
    else
        CHOOSE_IMAGE_GRID.style.display = "none";


}

async function ChooseCurrentImage(skinIndex) {
    let payload = await LoadData();

    payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].skin = skinIndex;

    await SaveData(payload);
}