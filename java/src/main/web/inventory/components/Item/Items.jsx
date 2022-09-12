import { Breadcrumb, Button, Col, Layout, Row, Space } from "antd"
import TableSearchBar from "../TableSearchBar/TableSearchBar"
import ItemList from "./ItemList"
import {AiOutlineHome, AiOutlinePlus} from 'react-icons/ai'
import { useEffect, useState } from "react"
import { fetchInventoryList } from "../../controller/item"
import { PlusOutlined } from '@ant-design/icons';


const {Content, Header} = Layout

const Items = ({items}) => {

    const [data, setData] = useState(items.data);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetchItems()
        setReload(false);
    }, [reload]);

    const fetchItems = async () => {
        let res = await fetchInventoryList();
        let formatRes = formatData(res.data)
        setData(formatRes);
    }

    const formatData = (items) => {
        let modData = [];
        console.log(items);
        items.map(item => {
            let date = item.lastModifiedDate === null ? new Date(item.createdDate) : new Date(item.lastModifiedDate)
            modData.push({
                key: item.id,
                name: item.name,
                price: item.itemPrice,
                modified: formatDate(date),
                modifiedDate: date,
                available: item.available ? "Yes" : "No"
            });
        })
        return modData;
    }

    const formatDate = (date) => {
        let hour = `${date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`}`
        let minute = `${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`
        let second = `${date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`}`
        let day = `${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`
        let month = `${date.getMonth() + 1 > 9 ? date.getMonth() + 1  : `0${date.getMonth() + 1}`}`
        let year = `${date.getFullYear()}`
        return `${hour}:${minute}:${second}  ${day}/${month}/${year}`
    }

  return (
    <>
        <Layout>
            <Content style={{padding:'20px 0'}}>
                <ItemList 
                    items={data} 
                    handleReload={() => setReload(true)} 
                />
            </Content>
        </Layout>
    </>
  )
}

export default Items