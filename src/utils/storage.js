const storage = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        const value = localStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};

export default storage;
