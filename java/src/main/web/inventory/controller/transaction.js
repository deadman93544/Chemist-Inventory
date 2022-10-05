import axios from "axios";

export const generateCheckSum = async (txn) => {
    const headers = {
        'Accept': '*/*',
        // 'User-Agent': 'request',
    };
    try {
        const res = await axios.post('http://localhost:8080/api/txn/checksum',
            {
                REQUESTTYPE: "Payment",
                ORDERID: "ORDER_1",
                TXN_AMOUNT: 1,
                // USERINFO: {
                //     CUSTOMERID: "CUST_001",
                //     mobile: "9354472053"
                // },
                // CALLBACK_URL: txn.CALLBACK_URL,
                // EMAIL: txn.EMAIL,
                MOBILE_NO: "9354472053"
            },
            {headers: headers}
        )
        return {
            data: res,
            error: null,
        }
    }
    catch (err) {
        return {
            data: null,
            error: err
        }
    }
}