function storeInLocalStorage(key: string, obj: {}) {
    const item = localStorage.getItem(key);
    const data: [{}] = item ? JSON.parse(item) : [];
    if (data) {
        data.push(obj);
        localStorage.setItem(key, JSON.stringify(data));
    }
}

function getFromLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

export {storeInLocalStorage, getFromLocalStorage};