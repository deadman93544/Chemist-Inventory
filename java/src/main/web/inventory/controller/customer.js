import axios from "axios"
import PATH from "./baseController";

export const fetchCustomerList = async () => {
    try {
        const res = await axios.get(`${PATH}/api/customer/list`);
        const customers = res.data;
        return {
            data: customers,
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

export const fetchCustomer = async (id) => {
    try {
        const res = await axios.get(`${PATH}/api/customer`, {params: {customerId: id}});
        const customer = res.data;
        return {
            data: customer,
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

export const addCustomer = async (customer) => {
    try {
        const res = await axios.post(`${PATH}/api/customer`, customer);
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

export const editCustomer = async (customer) => {
    try {
        const res = await axios.put(`${PATH}/api/customer`, customer);
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

export const deleteCustomer = async (id) => {
    try {
        const res = await axios.delete(`${PATH}/api/customer`, {params: {customerId: id}});
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
