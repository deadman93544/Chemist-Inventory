import axios from "axios"
import PATH from "./baseController";

export const fetchInventoryList = async () => {
    try {
        const res = await axios.get(`${PATH}/api/item/list`);
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
        const res = await axios.get(`${PATH}/api/item`, {params: {ItemId: id}});
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
        const res = await axios.post(`${PATH}/api/item`, item);
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
        const res = await axios.put(`${PATH}/api/item`, item);
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
        const res = await axios.delete(`${PATH}/api/item`, {params: {ItemId: id}});
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
