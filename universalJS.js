const API = 'https://sitebackend-ebr5.onrender.com/data';

async function LoadData() {
    const res = await fetch(API);
    const data = await res.json();
    return data;
}

async function SaveData(payload) {
    console.log("URL:", API);
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
