import axios from "axios";
import PATH from "./baseController";

export const fetchMonthSale = async () => {
    try {
        const res = await axios.get(`${PATH}/api/monthSale/current`);
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