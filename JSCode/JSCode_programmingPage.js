const ROOM_CODE = localStorage.getItem("roomCode");
const GRADE_NUM = localStorage.getItem("gradeNum");
const SET_OF_TASKS = localStorage.getItem("setOfTasks");
const THIS_PLAYER_INDEX = localStorage.getItem("playerIndex");
const THIS_ENEMY_INDEX = localStorage.getItem("enemyIndex");

const EDITOR = document.getElementById("editor");
const PLAYER_PROFILE_ICON = document.getElementById("playerIcon");
const PLAYER_PROFILE_NAME = document.getElementById("playerName");
const PLAYER_PROFILE_SCORE = document.getElementById("playerScore");
const ENEMY_PROFILE_ICON = document.getElementById("enemyIcon");
const ENEMY_PROFILE_NAME = document.getElementById("enemyName");
const ENEMY_PROFILE_SCORE = document.getElementById("enemyScore");

const BOM_CHAR = '\uFEFF';

let myTasks;
let enemyTasks;

let currentTask = "A";

let setUpProfiles = false;


Loop();


async function Loop() {
    while (true) {
        await SomeAsyncFunction();
        await Delay(75);
    }
}

function Delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function SomeAsyncFunction() {
    let payload = await LoadData();

    //if (payload.roomsCodes.length < 1) window.location.href = "index.html";

    myTasks = payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].tasks;
    enemyTasks = payload.rooms[ROOM_CODE].players[THIS_ENEMY_INDEX].tasks;

    SetUpProfiles(payload);


}

function SetUpProfiles(payload) {
    let playerScore = payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].score;
    let enemyScore = payload.rooms[ROOM_CODE].players[THIS_ENEMY_INDEX].score;

    PLAYER_PROFILE_SCORE.innerHTML = `${playerScore}/800`;
    ENEMY_PROFILE_SCORE.innerHTML = `${enemyScore}/800`;

    if (setUpProfiles) return;

    let playerName = payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].name;
    let enemyName = payload.rooms[ROOM_CODE].players[THIS_ENEMY_INDEX].name;
    let playerIcon = payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].skin;
    let enemyIcon = payload.rooms[ROOM_CODE].players[THIS_ENEMY_INDEX].skin;

    PLAYER_PROFILE_ICON.src = `./Icons/icon_${playerIcon}.png`;
    PLAYER_PROFILE_NAME.innerHTML = playerName + " (Ти)";
    ENEMY_PROFILE_ICON.src = `./Icons/icon_${enemyIcon}.png`;
    ENEMY_PROFILE_NAME.innerHTML = enemyName;
}

async function UploadSolution() {
    let currentNewCode = EDITOR.innerText;
    let cleanedCode = CleanCode(currentNewCode);

    console.log(cleanedCode);

    let res = await SubmitSolution(GRADE_NUM, SET_OF_TASKS, currentTask, cleanedCode);
    console.log(res);
}

function CleanCode(rawCode) {
    let withoutBom = rawCode.replace(new RegExp(`^${BOM_CHAR}`), '');
    let normalized = withoutBom.normalize('NFKC');
    return normalized;
}
