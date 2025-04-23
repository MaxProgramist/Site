const makeRoomCodeInput = localStorage.getItem("makeRoomCodeInput");
const codeTextField = document.getElementById('code');

codeTextField.innerText = "Code: " + makeRoomCodeInput.value;