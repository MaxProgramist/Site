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

let thisRoomGrade = 8, thisRoomTasksSet = "linar_1", thisRoomCountOfTasks = 8;

CODE_TEXT_FIELD.innerText = "Код: " + ROOM_CODE + ";";
GRADE_TEXT_FIELD.innerText = "Клас:" + thisRoomGrade + ";";
SET_OF_TASKS_TEXT_FIELD.innerText = "Сет задач: "+thisRoomTasksSet+";";
COUNT_OF_TASKS_INPUT.value = thisRoomCountOfTasks;

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
    let isRoomAvailable = await GetFunctionResultFromServer("JSCode_index", "RoomAvailability");
    if (!isRoomAvailable) window.location.href = "index.html";

    let playersInRooms = await GetFunctionResultFromServer("JSCode_adminPage", "GetPlayers", [ROOM_CODE]);

    TIME_FIELD.innerText = timeForTasksInMinutes;

    for (let i = 0; i < divToPlayer.length; i++)
        UpdatePlayerSkin(playersInRooms, i);

    while (playersInRooms.length > currentRoomPlayers) {
        NewPlayerIcon(playersInRooms, currentRoomPlayers);
        currentRoomPlayers++;
    }
}

function UpdatePlayerSkin(playersInRooms, playerIndex) {
    let playerDiv = divToPlayer[playerIndex];

    let playerSkin = playersInRooms[playerIndex].skin;
    let playerName = playersInRooms[playerIndex].name;

    let imgInsideDiv = playerDiv.querySelector("img");
    let pInsideDiv = playerDiv.querySelector("p");
    imgInsideDiv.src = `./Icons/icon_${playerSkin}.png`;
    pInsideDiv.textContent = playerName;
}

function NewPlayerIcon(playersInRooms, playerIndex) {
    let playerBox = document.createElement("div");
    playerBox.setAttribute('class', 'admin_grid_item');

    let playerBoxSkinImage = document.createElement("img");
    playerBoxSkinImage.src = "./Icons/icon_0.png";
    playerBoxSkinImage.setAttribute('class', 'universal_iconImage');

    let playerBoxName = document.createElement("p");
    playerBoxName.textContent = playersInRooms[playerIndex].name;

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
    GRADE_DIV_LIST.style.display = "none";

    if (thisRoomGrade == 8) {
        SET_OF_TASKS_DIV_LIST_GRADE_9.style.display = "none";
        SET_OF_TASKS_DIV_LIST_GRADE_10.style.display = "none";
        SET_OF_TASKS_DIV_LIST_GRADE_11.style.display = "none";
        if (SET_OF_TASKS_DIV_LIST_GRADE_8.style.display === "none")
            SET_OF_TASKS_DIV_LIST_GRADE_8.style.display = "block";
        else
            SET_OF_TASKS_DIV_LIST_GRADE_8.style.display = "none";
    }
    else if (thisRoomGrade == 9) {
        SET_OF_TASKS_DIV_LIST_GRADE_8.style.display = "none";
        SET_OF_TASKS_DIV_LIST_GRADE_10.style.display = "none";
        SET_OF_TASKS_DIV_LIST_GRADE_11.style.display = "none";
        if (SET_OF_TASKS_DIV_LIST_GRADE_9.style.display === "none")
            SET_OF_TASKS_DIV_LIST_GRADE_9.style.display = "block";
        else
            SET_OF_TASKS_DIV_LIST_GRADE_9.style.display = "none";
    }
    else if (thisRoomGrade == 10) {
        SET_OF_TASKS_DIV_LIST_GRADE_9.style.display = "none";
        SET_OF_TASKS_DIV_LIST_GRADE_8.style.display = "none";
        SET_OF_TASKS_DIV_LIST_GRADE_11.style.display = "none";
        if (SET_OF_TASKS_DIV_LIST_GRADE_10.style.display === "none")
            SET_OF_TASKS_DIV_LIST_GRADE_10.style.display = "block";
        else
            SET_OF_TASKS_DIV_LIST_GRADE_10.style.display = "none";
    }
    else if (thisRoomGrade == 11) {
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
    thisRoomGrade = numberOfGrade;
    GRADE_TEXT_FIELD.innerText = ";  Клас:" + numberOfGrade;
}

async function AddTimeForTasks(timeChanger) {
    if ((timeChanger > 0 && timeForTasksInMinutes < 120) || (timeChanger < 0 && timeForTasksInMinutes > 5))
        timeForTasksInMinutes += timeChanger;
}

async function ChangeSetOfTasksOfRoom(setOfTasks) {
    thisRoomTasksSet = setOfTasks;
    SET_OF_TASKS_TEXT_FIELD.innerText = ";  Сет задач: " + setOfTasks;
}

async function StartGame() {
    thisRoomCountOfTasks = COUNT_OF_TASKS_INPUT.value;
    let serverAnswer = await GetFunctionResultFromServer("JSCode_adminPage", "StartGame", [ROOM_CODE, thisRoomGrade, thisRoomTasksSet, timeForTasksInMinutes, Clamp(thisRoomCountOfTasks,1,8)]);

    if (typeof serverAnswer === "string") return PopUpWindowOfError(serverAnswer);

    window.location.href = "spectatorPage.html";
}

const Clamp = (value, min, max) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
