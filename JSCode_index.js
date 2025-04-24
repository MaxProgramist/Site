const joinRoomCodeInput = document.getElementById('joinRoomCodeInput');
const nicknameInput = document.getElementById('nicknameInput');
const makeRoomCodeInput = document.getElementById('makeRoomCodeInput');
const countOfPlayersInput = document.getElementById('countOfPlayersInput');


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
        if (payload.rooms[joinRoomCodeValue].isActive)
            return PopUpWindowOfError("The game has started in this room");

        for (const curentPlayer of payload.rooms[joinRoomCodeValue].players)
            if (curentPlayer.name == nicknameValue)
                return PopUpWindowOfError("Nickname is already taken!");

        const newPlayer = {
            "name": nicknameValue,
            "skin": 2,
            "enemy": -1,
            "tasks": "None",
            "score": 0
        }
        payload.rooms[joinRoomCodeValue].players.push(newPlayer);
    }
    else return PopUpWindowOfError("Wrong room code");


    await SaveData(payload);
}

async function MakeRoom() {
    const makeRoomCodeValue = makeRoomCodeInput.value;
    const roomPlayersCount = countOfPlayersInput.value;

    if (makeRoomCodeValue.length < 4) return PopUpWindowOfError("Incorect code type");
    if (roomPlayersCount < 2) return PopUpWindowOfError("Count of players is to small (at least 2)");
    if (roomPlayersCount > 199) return PopUpWindowOfError("Count of players is to big (at most 199)");

    for (let i = 0; i < makeRoomCodeValue.length; i++) {
        const charCode = makeRoomCodeValue.charCodeAt(i);
        if (charCode < 48 || charCode > 57) return PopUpWindowOfError("Incorect code type");
    }

    let payload = await LoadData();

    if (payload.roomsCodes.includes(makeRoomCodeValue))
        return PopUpWindowOfError("Room is already created!");

    const newRoom = {
        "countOfPlayers": roomPlayersCount,
        "isActive": false,
        "players": []
    };

    payload.roomsCodes.push(makeRoomCodeValue);
    payload.rooms[makeRoomCodeValue] = newRoom;

    await SaveData(payload);


    await localStorage.setItem("roomCode", makeRoomCodeInput.value);
    window.location.href = "adminPage.html";
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
    errorBox.setAttribute('class', 'index_errorBox');

    let closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.setAttribute('class', 'index_errorBoxButton');
    closeButton.onclick = function () {
        errorBox.remove();
    };

    errorBox.innerHTML += `Error: <br> ${errorType} <br>`;
    errorBox.appendChild(closeButton);

    document.body.appendChild(errorBox);
}

function RandomString(length) {
    let result = '';
    const characters = '0123456789';

    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomInd);
    }

    return result;
}
