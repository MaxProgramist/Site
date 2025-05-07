const ROOM_CODE = localStorage.getItem("roomCode");
const THIS_PLAYER_INDEX = localStorage.getItem("playerIndex");
const GRADE_NUM = localStorage.getItem("gradeNum");
const SET_OF_TASKS = localStorage.getItem("setOfTasks");

let editor = window.editor;

let myTasks = payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].tasks;
let enemyTasks = ;

const waitForEditor = setInterval(() => {
    if (window.editor) {
        clearInterval(waitForEditor);
        editor = window.editor;
        editor.layout();
    }
}, 10);

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

    let myTasks = payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].tasks;
    let enemyTasks = payload.rooms[ROOM_CODE].players[payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].enemy].tasks;
}

function UploadSolution()
{
    if (!editor) return;
    
    let currentNewCode = editor.getValue();

    console.log(currentNewCode)
}