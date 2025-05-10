const ROOM_CODE = localStorage.getItem("roomCode");
const GRADE_NUM = localStorage.getItem("gradeNum");
const SET_OF_TASKS = localStorage.getItem("setOfTasks");
const THIS_PLAYER_INDEX = localStorage.getItem("playerIndex");
const THIS_ENEMY_INDEX = localStorage.getItem("enemyIndex");

const EDITOR = document.getElementById("editor");
const TASK_FIELD = document.getElementById("tasksField");
const TASK_BUTTONS_FIELD = document.getElementById("tasksButtons");

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

    currentTask = payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].tasks[0];

    SetUpUI(payload);
}

function SetUpUI(payload) {
    const TASKS = payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].tasks;

    for (let currentChar in TASKS) {
        let taskButton = document.createElement("button");
        taskButton.innerText = currentChar;
        taskButton.onclick = NewTask(currentChar);

        TASK_BUTTONS_FIELD.appendChild(taskButton);
    }
}

async function NewTask(taskChar) {
    const CURRENT_NEW_TASK = await FetchTask(GRADE_NUM, SET_OF_TASKS, taskChar);;

    TASK_FIELD.innerHTML = "";

    let taskLetterAndName = document.createElement("p");
    let taskLimits = document.createElement("p");
    let taskCondition = document.createElement("p");
    let taskInputExplanation_Title = document.createElement("p");
    let taskInputExplanation = document.createElement("p");
    let taskOutputExplanation_Title = document.createElement("p");
    let taskOutputExplanation = document.createElement("p");

    taskLimits.setAttribute('class', 'programming_limits');

    taskLetterAndName.innerHTML = `<font size="4"> Задача ${taskChar}</font> <br> <font size="6"><b>${CURRENT_NEW_TASK.name}</b></font>`;
    taskLimits.innerHTML = `<font size="4"> <em>${CURRENT_NEW_TASK.limits}</em></font>`;
    taskCondition.innerText = CURRENT_NEW_TASK.description;
    taskInputExplanation_Title.innerHTML = `<font size="5"><b>Вхідні файли</b></font>`;
    taskInputExplanation.innerText = CURRENT_NEW_TASK.inputExplanation;
    taskOutputExplanation_Title.innerHTML = `<font size="5"><b>Вихідні файли</b></font>`;
    taskOutputExplanation.innerText = CURRENT_NEW_TASK.outputExplanation;

    TASK_FIELD.appendChild(taskLetterAndName);
    TASK_FIELD.appendChild(taskLimits);
    TASK_FIELD.appendChild(taskCondition);
    TASK_FIELD.appendChild(taskInputExplanation_Title);
    TASK_FIELD.appendChild(taskInputExplanation);
    TASK_FIELD.appendChild(taskOutputExplanation_Title);
    TASK_FIELD.appendChild(taskOutputExplanation);
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
