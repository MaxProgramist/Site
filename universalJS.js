function RandomString(length) {
    let result = '';
    const characters = '0123456789';

    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomInd);
    }

    return result;
}

async function LoadData() {
    const res = await fetch(API);
    const data = await res.json();
    return data;
}

async function SaveData(payload) {
    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}

async function ResetData() {
    let payload = {
        roomsCodes: [],
        rooms: {}
    };

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}