const roomCode = localStorage.getItem("roomCode");

const playerListDiv = document.getElementById("playersGrid");


async function MakePlayersGroups() {
    let payload = await LoadData();

    let usedPlayers = [];
    for (let i = 0; i < payload.rooms[roomCode].players.length; i++) {
        if (usedPlayers.includes(i)) continue;

        NewPlayerIcon(payload, i);
        NewPlayerIcon(payload, payload.rooms[roomCode].players[i].enemy);
        usedPlayers.push(i);
        usedPlayers.push(payload.rooms[roomCode].players[i].enemy);
    }
}

function NewPlayerIcon(payload, playerIndex) {
    let playerBox = document.createElement("div");
    playerBox.setAttribute('class', 'admin_grid_item');

    playerBox.innerHTML += payload.rooms[roomCode].players[playerIndex].name;

    playerListDiv.appendChild(playerBox);
}