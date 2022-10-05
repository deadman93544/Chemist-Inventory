import axios from "axios"
import PATH from "./baseController";

export const createSale = async (sale) => {
    try {
        const res = await axios.post(`${PATH}/api/sale`, sale);
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