const makeRoomCodeInput = localStorage.getItem("roomCode");
const codeTextField = document.getElementById('code');

codeTextField.innerText = "Code: " + makeRoomCodeInput;