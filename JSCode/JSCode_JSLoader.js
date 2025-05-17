const API_JS = "https://javascriptbackend-ej8u.onrender.com";

// * ------------ Universal Functions ------------ //
// * --------------- Without Server -------------- //
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

// * ---------------- With Server --------------- //

//await GetFunctionResultFromServer("JSCode_programmingPage", "GetFullTask", [8, "linar_1", 'A']));

async function GetFunctionResultFromServer(file, functionName, args = []) {
    const response = await fetch(`${API_JS}/call`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fileName: file,
            functionName: functionName,
            args: args
        })
    });

    const result = await response.json();
    return result.result;
}
