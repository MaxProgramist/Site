const JOIN_ROOM_CODE_INPUT = document.getElementById('joinRoomCodeInput');
const NICKNAME_INPUT = document.getElementById('nicknameInput');
const MAKE_ROOM_CODE_INPUT = document.getElementById('makeRoomCodeInput');
const COUNT_OF_PLAYERS_INPUT = document.getElementById('countOfPlayersInput');


async function JoinRoom() {
    let joinRoomCodeValue = JOIN_ROOM_CODE_INPUT.value;
    let nicknameValue = NICKNAME_INPUT.value;

    if (joinRoomCodeValue.length < 4) return PopUpWindowOfError("Incorrect code type");
    if (nicknameValue.length < 1) return PopUpWindowOfError("Incorrect nickname type");

    for (let i = 0; i < joinRoomCodeValue.length; i++) {
        let charCode = joinRoomCodeValue.charCodeAt(i);
        if (charCode < 48 || charCode > 57) return PopUpWindowOfError("Incorrect code type");
    }

    let payload = await LoadData();

    if (payload.roomsCodes.includes(joinRoomCodeValue)) {
        if (payload.rooms[joinRoomCodeValue].countOfPlayers <= payload.rooms[joinRoomCodeValue].players.length)
            return PopUpWindowOfError("Too many players in room");
        if (payload.rooms[joinRoomCodeValue].isActive)
            return PopUpWindowOfError("The game has started in this room");

        for (let currentPlayer of payload.rooms[joinRoomCodeValue].players)
            if (currentPlayer.name == nicknameValue)
                return PopUpWindowOfError("Nickname is already taken!");

        const newPlayer = {
            "name": nicknameValue,
            "skin": 0,
            "enemy": -1,
            "tasks": "",
            "score": 0,
            "canChoose": false
        }
        payload.rooms[joinRoomCodeValue].players.push(newPlayer);
    }
    else return PopUpWindowOfError("Wrong room code");

    await SaveData(payload);

    await sessionStorage.setItem("roomCode", joinRoomCodeValue);
    await sessionStorage.setItem("playerIndex", payload.rooms[joinRoomCodeValue].players.length-1);
    window.location.href = "playerPage.html";
}

async function MakeRoom() {
    let makeRoomCodeValue = MAKE_ROOM_CODE_INPUT.value;
    let roomPlayersCount = COUNT_OF_PLAYERS_INPUT.value;

    if (makeRoomCodeValue.length < 4) return PopUpWindowOfError("Incorrect code type");
    if (roomPlayersCount < 2) return PopUpWindowOfError("Count of players is to small (at least 2)");
    if (roomPlayersCount > 199) return PopUpWindowOfError("Count of players is to big (at most 199)");

    for (let i = 0; i < makeRoomCodeValue.length; i++) {
        let charCode = makeRoomCodeValue.charCodeAt(i);
        if (charCode < 48 || charCode > 57) return PopUpWindowOfError("Incorrect code type");
    }

    let payload = await LoadData();

    if (payload.roomsCodes.includes(makeRoomCodeValue))
        return PopUpWindowOfError("Room is already created!");

    let newRoom = {
        "countOfPlayers": roomPlayersCount,
        "isActive": false,
        "grade": 8,
        "numberOfTasksSet": "linar_1",
        "maxCountOfTasks": 8,
        "maxTimeForTasks": 45,
        "startTimeForTasks": 0,
        "players": []
    };

    payload.roomsCodes.push(makeRoomCodeValue);
    payload.rooms[makeRoomCodeValue] = newRoom;

    await SaveData(payload);

    await sessionStorage.setItem("roomCode", makeRoomCodeValue);
    window.location.href = "adminPage.html";
}

async function MakeRandomRoomCode() {
    let payload = await LoadData();

    let currentRoomCode = RandomString(4);

    while (payload.roomsCodes.includes(currentRoomCode)) {
        currentRoomCode = RandomString(4);
    }

    MAKE_ROOM_CODE_INPUT.value = `${currentRoomCode}`;
}

function RandomString(length) {
    let result = '';
    const CHARACTERS = '0123456789';

    for (let i = 0; i < length; i++) {
        let randomInd = Math.floor(Math.random() * CHARACTERS.length);
        result += CHARACTERS.charAt(randomInd);
    }

    return result;
}

async function WakeUpServers() {
    await LoadData();
    await FetchTask(8, 'linar_1', 'A');
    return PopUpWindowOfError("Servers are awake!");
}
