import axios from "axios"

export const fetchInventoryList = async () => {
    try {
        const res = await axios.get('http://localhost:8080/api/item/list');
        const items = res.data;
        return {
            data: items,
            error: null
        };
    }
    catch (err) {
        return {
            data: null,
            error: err
        }
    }
}

export const fetchInventoryItem = async (id) => {
    try {
        const res = await axios.get('http://localhost:8080/api/item', {params: {ItemId: id}});
        const items = res.data;
        return {
            data: items,
            error: null
        };
    }
    catch (err) {
        return {
            data: null,
            error: err
        }
    }
}

export const addInventoryItem = async (item) => {
    try {
        const res = await axios.post('http://localhost:8080/api/item', item);
        return {
            data: res.status,
            error: null
        };
    }
    catch (err) {
        return {
            data: null,
            error: err
        }
    }
}

export const editInventoryItem = async (item) => {
    try {
        const res = await axios.put('http://localhost:8080/api/item', item);
        return {
            data: res.status,
            error: null
        };
    }
    catch (err) {
        return {
            data: null,
            error: err
        }
    }
}

export const deleteInventoryItem = async (id) => {
    try {
        const res = await axios.delete('http://localhost:8080/api/item', {params: {ItemId: id}});
        return {
            data: res.status,
            error: null
        };
    }
    catch (err) {
        return {
            data: null,
            error: err
        }
    }
}
