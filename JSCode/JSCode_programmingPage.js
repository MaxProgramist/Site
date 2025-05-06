const ROOM_CODE = localStorage.getItem("roomCode");
const THIS_PLAYER_INDEX = localStorage.getItem("playerIndex");
const GRADE_NUM = localStorage.getItem("gradeNum");
const SET_OF_TASKS = localStorage.getItem("setOfTasks");

let editor = window.editor;

function UploadSolution()
{
    if (!editor) return;
    
    let currentNewCode = editor.getValue();

    console.log(currentNewCode)
}

const waitForEditor = setInterval(() => {
    if (window.editor) {
        clearInterval(waitForEditor);
        editor = window.editor;
    }
}, 100);