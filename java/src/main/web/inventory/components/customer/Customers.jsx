import { Breadcrumb, Button, Col, Layout, Row, Space } from "antd"
import TableSearchBar from "../TableSearchBar/TableSearchBar"
import CustomerList from "./CustomerList"
import {AiOutlineHome, AiOutlinePlus} from 'react-icons/ai'
import { useEffect, useState } from "react"
import { fetchCustomerList } from "../../controller/customer"
import { PlusOutlined } from '@ant-design/icons';


const {Content} = Layout

const Customers = ({customers}) => {

    const [data, setData] = useState(customers.data);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetchItems()
        setReload(false);
    }, [reload]);
    
    const formatData = (items) => {
        let modData = [];
        console.log(items);
        items.map(item => {
            let date = item.lastModifiedDate === null ? new Date(item.createdDate) : new Date(item.lastModifiedDate)
            modData.push({
                key: item.id,
                name: item.name,
                balance: item.balance,
                phoneNum: item.phoneNum,
                modified: formatDate(date),
                modifiedDate: date,
            });
        })
        return modData;
    }

    const formatDate = (date) => {
        let hour = `${date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`}`
        let minute = `${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`
        let second = `${date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`}`
        let day = `${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`
        let month = `${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}`
        let year = `${date.getFullYear()}`
        return `${hour}:${minute}:${second}  ${day}/${month}/${year}`
    }

    const fetchItems = async () => {
        let res = await fetchCustomerList();
        let formatRes = formatData(res.data);
        setData(formatRes);
    }

  return (
    <>
        <Layout>
            <Content style={{padding:'20px 0'}}>
                <CustomerList items={data} handleReload ={ () => setReload(true)} />
            </Content>
        </Layout>
    </>
  )
}

export default Customers