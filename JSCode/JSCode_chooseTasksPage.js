const ROOM_CODE = localStorage.getItem("roomCode");
const THIS_PLAYER_INDEX = localStorage.getItem("playerIndex");
const GRADE_NUM = localStorage.getItem("gradeNum");
const SET_OF_TASKS_NUM = localStorage.getItem("setOfTasksNum");

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
}