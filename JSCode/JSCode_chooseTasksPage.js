const ROOM_CODE = localStorage.getItem("roomCode");
const THIS_PLAYER_INDEX = localStorage.getItem("playerIndex");
const GRADE_NUM = localStorage.getItem("gradeNum");
const SET_OF_TASKS = localStorage.getItem("setOfTasks");

const DIV_LIST_OF_CARDS = document.getElementById("cardsList");;

var listOfCardsLetter = [];

var cardMade = false;
var cardIsOpen = false;

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

    let myTasks = payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].tasks;
    console.log(`My tasks` + listOfCardsLetter.length);

    for (let myCurrentTaskIndex = 0; myCurrentTaskIndex < myTasks.length; myCurrentTaskIndex++) {
        let myCurrentTask = myTasks[myCurrentTaskIndex];
        for (let currentTaskIndex = 0; currentTaskIndex < listOfCardsLetter.length; currentTaskIndex++) {
            console.log(`CardConsole of ${currentTaskIndex}` + listOfCardsLetter[currentTaskIndex].innerHTML);
            if (`<font size="3"> Задача ${myCurrentTask} </font>` == listOfCardsLetter[currentTaskIndex].innerHTML) {
                listOfCardsLetter[currentTaskIndex].parentElement.remove();
                listOfCardsLetter.splice(currentTaskIndex,currentTaskIndex);

                break;
            }
        }
    }


    if (!cardMade) {
        for (let i = 0; i < 16; i++) {
            let taskChar = String.fromCharCode('A'.charCodeAt(0) + i);
            let res = await FetchTask(8, 'linar_1', taskChar);
            CreateCardWithTask(res, taskChar);
        }
        cardMade = !cardMade;
    }

    console.log(THIS_PLAYER_INDEX);
}

function CreateCardWithTask(task, taskPeriod) {
    let taskCard = document.createElement("div");
    taskCard.setAttribute('class', 'chooseTasks_cardOfTask');

    let selectButton = document.createElement("button");
    let infoButton = document.createElement("button");
    let taskLetter = document.createElement("p");
    let taskName = document.createElement("p");

    taskLetter.innerHTML = `<font size="3"> Задача ${taskPeriod} </font>`;
    taskName.innerHTML = `<font size="4"> ${task.name} </font>`;

    listOfCardsLetter.push(taskLetter);

    selectButton.innerHTML = "✓";
    selectButton.setAttribute('class', 'chooseTasks_cardOfTask_button_select');
    selectButton.onclick = async function () {
        let payload = await LoadData();

        const ENEMY_INDEX = payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].enemy;

        let canPlayerChoose = payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].canChoose;
        console.log(canPlayerChoose + " " + THIS_PLAYER_INDEX);

        if (!canPlayerChoose) return;

        let myTasks = payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].tasks;

        for (let myCurrentTaskIndex = 0; myCurrentTaskIndex < myTasks.length; myCurrentTaskIndex++) {
            let myCurrentTask = myTasks[myCurrentTaskIndex];
            if (myCurrentTask == taskPeriod) {
                return;
            }
        }

        payload.rooms[ROOM_CODE].players[ENEMY_INDEX].tasks += taskPeriod;

        payload.rooms[ROOM_CODE].players[THIS_PLAYER_INDEX].canChoose = !canPlayerChoose;
        payload.rooms[ROOM_CODE].players[ENEMY_INDEX].canChoose = canPlayerChoose;

        await SaveData(payload);

        taskCard.remove();
    };
    infoButton.innerHTML = "I";
    infoButton.setAttribute('class', 'chooseTasks_cardOfTask_button_info');
    infoButton.onclick = () => FullTaskField(task, taskPeriod);

    taskCard.appendChild(taskLetter);
    taskCard.appendChild(taskName);
    taskCard.appendChild(selectButton);
    taskCard.appendChild(infoButton);

    DIV_LIST_OF_CARDS.appendChild(taskCard);
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