const ROOM_CODE = sessionStorage.getItem("roomCode");

const CODE_TEXT_FIELD = document.getElementById("code");
const GRADE_TEXT_FIELD = document.getElementById("grade");
const SET_OF_TASKS_TEXT_FIELD = document.getElementById("setOfTasks");
const PLAYER_DIV_LIST = document.getElementById("playersGrid");
const COUNT_OF_TASKS_INPUT = document.getElementById("countOfPlayersInput");
const TIME_FIELD = document.getElementById("timeField");

const GRADE_DIV_LIST = document.getElementById("gradeList");
const SET_OF_TASKS_DIV_LIST_GRADE_8 = document.getElementById("setList_grade_8");
const SET_OF_TASKS_DIV_LIST_GRADE_9 = document.getElementById("setList_grade_9");
const SET_OF_TASKS_DIV_LIST_GRADE_10 = document.getElementById("setList_grade_10");
const SET_OF_TASKS_DIV_LIST_GRADE_11 = document.getElementById("setList_grade_11");

CODE_TEXT_FIELD.innerText = "Код: " + ROOM_CODE;
GRADE_TEXT_FIELD.innerText = ";  Клас:" + 8;
SET_OF_TASKS_TEXT_FIELD.innerText = ";  Сет задач: Лінійні алгоритми 1";
COUNT_OF_TASKS_INPUT.value = 8;

let divToPlayer = [];
let timeForTasksInMinutes = 45;

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

    TIME_FIELD.innerText = timeForTasksInMinutes;

    for (let i = 0; i < divToPlayer.length; i++)
        UpdatePlayerSkin(payload, i);

    while (payload.rooms[ROOM_CODE].players.length > currentRoomPlayers) {
        NewPlayerIcon(payload, currentRoomPlayers);
        currentRoomPlayers++;
    }
}

function UpdatePlayerSkin(payload, playerIndex) {
    let playerDiv = divToPlayer[playerIndex];

    let playerSkin = payload.rooms[ROOM_CODE].players[playerIndex].skin;
    let playerName = payload.rooms[ROOM_CODE].players[playerIndex].name;

    let imgInsideDiv = playerDiv.querySelector("img");
    let pInsideDiv = playerDiv.querySelector("p");
    imgInsideDiv.src = `./Icons/icon_${playerSkin}.png`;
    pInsideDiv.textContent = playerName;
}

function NewPlayerIcon(payload, playerIndex) {
    let playerBox = document.createElement("div");
    playerBox.setAttribute('class', 'admin_grid_item');

    let playerBoxSkinImage = document.createElement("img");
    playerBoxSkinImage.src = "./Icons/icon_0.png";
    playerBoxSkinImage.setAttribute('class', 'universal_iconImage');

    let playerBoxName = document.createElement("p");
    playerBoxName.textContent = payload.rooms[ROOM_CODE].players[playerIndex].name;

    playerBox.appendChild(playerBoxSkinImage);
    playerBox.appendChild(playerBoxName);

    divToPlayer[playerIndex] = playerBox;

    PLAYER_DIV_LIST.appendChild(playerBox);
}

function GradeMenu() {
    if (GRADE_DIV_LIST.style.display === "none")
        GRADE_DIV_LIST.style.display = "block";
    else
        GRADE_DIV_LIST.style.display = "none";

    SET_OF_TASKS_DIV_LIST_GRADE_8.style.display = "none";
    SET_OF_TASKS_DIV_LIST_GRADE_9.style.display = "none";
    SET_OF_TASKS_DIV_LIST_GRADE_10.style.display = "none";
    SET_OF_TASKS_DIV_LIST_GRADE_11.style.display = "none";
}

async function SetOfTasksMenu() {
    let payload = await LoadData();

    GRADE_DIV_LIST.style.display = "none";

    if (payload.rooms[ROOM_CODE].grade == 8) {
        SET_OF_TASKS_DIV_LIST_GRADE_9.style.display = "none";
        SET_OF_TASKS_DIV_LIST_GRADE_10.style.display = "none";
        SET_OF_TASKS_DIV_LIST_GRADE_11.style.display = "none";
        if (SET_OF_TASKS_DIV_LIST_GRADE_8.style.display === "none")
            SET_OF_TASKS_DIV_LIST_GRADE_8.style.display = "block";
        else
            SET_OF_TASKS_DIV_LIST_GRADE_8.style.display = "none";
    }
    else if (payload.rooms[ROOM_CODE].grade == 9) {
        SET_OF_TASKS_DIV_LIST_GRADE_8.style.display = "none";
        SET_OF_TASKS_DIV_LIST_GRADE_10.style.display = "none";
        SET_OF_TASKS_DIV_LIST_GRADE_11.style.display = "none";
        if (SET_OF_TASKS_DIV_LIST_GRADE_9.style.display === "none")
            SET_OF_TASKS_DIV_LIST_GRADE_9.style.display = "block";
        else
            SET_OF_TASKS_DIV_LIST_GRADE_9.style.display = "none";
    }
    else if (payload.rooms[ROOM_CODE].grade == 10) {
        SET_OF_TASKS_DIV_LIST_GRADE_9.style.display = "none";
        SET_OF_TASKS_DIV_LIST_GRADE_8.style.display = "none";
        SET_OF_TASKS_DIV_LIST_GRADE_11.style.display = "none";
        if (SET_OF_TASKS_DIV_LIST_GRADE_10.style.display === "none")
            SET_OF_TASKS_DIV_LIST_GRADE_10.style.display = "block";
        else
            SET_OF_TASKS_DIV_LIST_GRADE_10.style.display = "none";
    }
    else if (payload.rooms[ROOM_CODE].grade == 11) {
        SET_OF_TASKS_DIV_LIST_GRADE_8.style.display = "none";
        SET_OF_TASKS_DIV_LIST_GRADE_10.style.display = "none";
        SET_OF_TASKS_DIV_LIST_GRADE_9.style.display = "none";
        if (SET_OF_TASKS_DIV_LIST_GRADE_11.style.display === "none")
            SET_OF_TASKS_DIV_LIST_GRADE_11.style.display = "block";
        else
            SET_OF_TASKS_DIV_LIST_GRADE_11.style.display = "none";
    }
}


async function ChangeGradeOfRoom(numberOfGrade) {
    let payload = await LoadData();

    payload.rooms[ROOM_CODE].grade = numberOfGrade;
    GRADE_TEXT_FIELD.innerText = ";  Клас:" + numberOfGrade;

    await SaveData(payload);
}

async function AddTimeForTasks(timeChanger) {
    if ((timeChanger > 0 && timeForTasksInMinutes < 120) || (timeChanger < 0 && timeForTasksInMinutes > 5))
        timeForTasksInMinutes += timeChanger;
}

async function ChangeSetOfTasksOfRoom(numberOfSet) {
    let payload = await LoadData();

    payload.rooms[ROOM_CODE].numberOfTasksSet = numberOfSet;
    SET_OF_TASKS_TEXT_FIELD.innerText = ";  Сет задач: " + numberOfSet;

    await SaveData(payload);
}

async function StartGame() {
    let payload = await LoadData();

    if (payload.roomsCodes.length < 1) window.location.href = "index.html";
    if (payload.rooms[ROOM_CODE].players.length < 1)
        return PopUpWindowOfError("Count of players is to small (at least 2)");

    payload.rooms[ROOM_CODE].isActive = true;
    payload.rooms[ROOM_CODE].maxCountOfTasks = clamp(COUNT_OF_TASKS_INPUT.value, 1, 8);
    payload.rooms[ROOM_CODE].maxTimeForTasks = timeForTasksInMinutes;
    payload.rooms[ROOM_CODE].startTimeForTasks = new Date();

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
        payload.rooms[ROOM_CODE].players[playerList[0]].canChoose = Math.random() < 0.5;
        payload.rooms[ROOM_CODE].players[randomInd].canChoose = !payload.rooms[ROOM_CODE].players[playerList[0]].canChoose;
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

const clamp = (value, min, max) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
