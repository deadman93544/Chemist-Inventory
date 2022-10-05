import axios from "axios";
import PATH from "./baseController";

export const fetchDaySale = async () => {
    try {
        const res = await axios.get(`${PATH}/api/daySale/today`);
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