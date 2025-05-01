const ROOM_CODE = localStorage.getItem("roomCode");
const THIS_PLAYER_INDEX = localStorage.getItem("playerIndex");
const GRADE_NUM = localStorage.getItem("gradeNum");
const SET_OF_TASKS = localStorage.getItem("setOfTasks");

var cardMade = false;

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

    //if (payload.roomsCodes.length < 1) window.location.href = "index.html";

    if (!cardMade) {
        for (let i = 0; i<16; i++)
        {
            let res = await FetchTask(GRADE_NUM, SET_OF_TASKS, string(int('A')+i) );
        }
    }
}

function CreateCardWithTask(task)
{
    let errorBox = document.createElement("div");
    errorBox.setAttribute('class', 'chooseTasks_cardOfTask');

    let closeButton = document.createElement("button");
    let selectButton = document.createElement("button");
    closeButton.textContent = "Закрити";
    selectButton.textContent = "Вибрати";
    closeButton.setAttribute('class', 'chooseTasks_cardOfTask_button_close');
    selectButton.setAttribute('class', 'chooseTasks_cardOfTask_button_select');


    document.body.appendChild(errorBox);
}