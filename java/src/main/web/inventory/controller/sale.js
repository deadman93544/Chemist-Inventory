import axios from "axios"
import PATH from "./baseController";

export const createSale = async (sale) => {
    try {
        const res = await axios.post(`${PATH}/api/sale`, sale);
        return {
            data: res.data,
            error: null
        };
    }
    catch (err) {
        return {
            data: null,
            error: err
        };
    }
}

export const getSaleById = async (saleId) => {
    try {
        const res = await axios.get(`${PATH}/api/sale?saleId=${saleId}`);
        return {
            data: res.data,
            error: null
        };
    }
    catch (err) {
        return {
            data: null,
            error: err
        };
    }
}

export const getSaleList = async () => {
    try{
        const res = await axios.get(`${PATH}/api/sale/list`);
        return {
            data: res.data,
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