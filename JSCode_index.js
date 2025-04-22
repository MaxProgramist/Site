const joinRoomCodeInput = document.getElementById('joinRoomCodeInput');
const nicknameInput = document.getElementById('nicknameInput');
const makeRoomCodeInput = document.getElementById('makeRoomCodeInput');
const countOfPlayersInput = document.getElementById('countOfPlayersInput');
const lobbyElements = document.querySelector('.lobbyElements');

const API = 'https://sitebackend-ebr5.onrender.com/data';

async function JoinRoom() {
    const joinRoomCodeValue = joinRoomCodeInput.value;
    const nicknameValue = nicknameInput.value;

    if (joinRoomCodeValue.length < 4) return PopUpWindowOfError("Incorect code type");
    if (nicknameValue.length < 1) return PopUpWindowOfError("Incorect nickname type");

    for (let i = 0; i < joinRoomCodeValue.length; i++) {
        const charCode = joinRoomCodeValue.charCodeAt(i);
        if (charCode < 48 || charCode > 57) return PopUpWindowOfError("Incorect code type");
    }

    let payload = await LoadData();

    if (payload.roomsCodes.includes(joinRoomCodeValue)) {
        if (payload.rooms[joinRoomCodeValue].countOfPlayers <= payload.rooms[joinRoomCodeValue].players.length)
            return PopUpWindowOfError("Too many players in room");
        const newPlayer = {
            "name": nicknameValue,
            "skin": 2,
            "enemy": "None",
            "tasks": "None"
        }
        payload.rooms[joinRoomCodeValue].players.push(newPlayer);
    }
    else return PopUpWindowOfError("Wrong room code");

    SaveData(payload);
}

async function MakeRoom() {
    const makeRoomCodeValue = makeRoomCodeInput.value;
    const roomPlayersCount = countOfPlayersInput.value;

    if (makeRoomCodeValue.length < 4) return PopUpWindowOfError("Incorect code type");
    if (roomPlayersCount < 4) return PopUpWindowOfError("Count of players is to small (at least 4)");

    for (let i = 0; i < makeRoomCodeValue.length; i++) {
        const charCode = makeRoomCodeValue.charCodeAt(i);
        if (charCode < 48 || charCode > 57) return PopUpWindowOfError("Incorect code type");
    }

    let payload = await LoadData();

    if (payload.roomsCodes.includes(makeRoomCodeValue)) return PopUpWindowOfError("Room is already created!");

    const newRoom = {
        "countOfPlayers": roomPlayersCount,
        "players": []
    };

    payload.roomsCodes.push(makeRoomCodeValue);
    payload.rooms[makeRoomCodeValue] = newRoom;

    SaveData(payload);

    console.log("MAKE ROOM!");
}

async function MakeRandomRoomCode() {
    let payload = await LoadData();

    let curentRoomCode = RandomString(4);

    while (payload.roomsCodes.includes(curentRoomCode)) {
        curentRoomCode = RandomString(4);
    }

    makeRoomCodeInput.value = `${curentRoomCode}`;
}

function PopUpWindowOfError(errorType) {
    let errorBox = document.createElement("div");
    errorBox.setAttribute('class', 'errorBox');

    let closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.setAttribute('class', 'errorBoxButton');
    closeButton.onclick = function () {
        errorBox.remove();
    };

    errorBox.innerHTML += `Error: <br> ${errorType} <br>`;
    errorBox.appendChild(closeButton);

    document.body.appendChild(errorBox);
}