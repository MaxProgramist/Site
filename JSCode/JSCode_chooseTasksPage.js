const ROOM_CODE = localStorage.getItem("roomCode");
const THIS_PLAYER_INDEX = localStorage.getItem("playerIndex");
const GRADE_NUM = localStorage.getItem("gradeNum");
const SET_OF_TASKS = localStorage.getItem("setOfTasks");

const LIST_OF_CARDS = document.getElementById("cardsList");;

var cardMade = false;

let cardIsOpen = false;

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
        for (let i = 0; i < 16; i++) {
            let taskChar = String.fromCharCode('A'.charCodeAt(0)+i);
            let res = await FetchTask(8, 'linar_2', taskChar);
            CreateCardWithTask(res, taskChar);
        }
        cardMade = !cardMade;
    }
}

function CreateCardWithTask(task, taskPeriod) {
    let taskCard = document.createElement("div");
    taskCard.setAttribute('class', 'chooseTasks_cardOfTask');

    taskCard.addEventListener('click', () => FullTaskField(task,taskPeriod));

    let selectButton = document.createElement("button");
    let taskLetter = document.createElement("p");
    let taskName = document.createElement("p");

    taskLetter.innerHTML = ` <font size="3"> Задача ${taskPeriod} </font> `;
    taskName.innerHTML = ` <font size="4"> ${task.name} </font> `;

    selectButton.innerHTML = "✓";
    selectButton.setAttribute('class', 'chooseTasks_cardOfTask_button_select');

    taskCard.appendChild(taskLetter);
    taskCard.appendChild(taskName);
    taskCard.appendChild(selectButton);

    LIST_OF_CARDS.appendChild(taskCard);
}

function FullTaskField(task, taskPeriod) {
    if (cardIsOpen) return;

    let fullTask = document.createElement("div");
    fullTask.setAttribute('class', 'chooseTasks_fullTask');

    let closeButton = document.createElement("button");
    let taskLetter = document.createElement("p");
    let taskName = document.createElement("p");
    let taskCondition = document.createElement("p");

    taskLetter.innerHTML = ` <font size="3"> Задача ${taskPeriod} </font> `;
    taskName.innerHTML = ` <font size="4"> ${task.name} </font> `;
    taskCondition.innerHTML = ` <font size="3"> ${task.description} </font> `;

    taskLetter.setAttribute('class', 'chooseTasks_fullTask_p_letter');
    taskName.setAttribute('class', 'chooseTasks_fullTask_p_name');
    taskCondition.setAttribute('class', 'chooseTasks_fullTask_p_condition');

    closeButton.innerHTML = "✕";
    closeButton.onclick = function () {
        fullTask.remove();
        cardIsOpen = false;
    };
    closeButton.setAttribute('class', 'chooseTasks_fullTask_button_close');

    fullTask.appendChild(taskLetter);
    fullTask.appendChild(taskName);
    fullTask.appendChild(taskCondition);
    fullTask.appendChild(closeButton);

    document.body.appendChild(fullTask);
    cardIsOpen = true;
}