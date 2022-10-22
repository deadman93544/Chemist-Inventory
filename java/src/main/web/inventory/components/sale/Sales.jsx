import {useEffect, useState} from 'react'
import { Affix, Avatar, Breadcrumb, Button, Card, Col, Divider, Input, InputNumber, Layout, message, Row ,Select,Space,Table,Typography} from 'antd'
import Link from 'next/link';
import { ReloadOutlined, HomeOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableSearchBar from '../TableSearchBar/TableSearchBar';
import { getSaleList } from '../../controller/sale';
import SalesList from '../customer/SalesList';
const { Meta } = Card;
const {Title}=Typography


export const Sales = ({sales}) => {

	const [data, setData] = useState(sales.data);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		fetchData();
		setReload(false);
	}, [reload])
	
	const fetchData = async () => {
		let res = await getSaleList();
		let formatRes = formatData(res.data);
		setData(formatRes);
		showMessage("SUCCESS", "Successfully re-loaded");
	}

	const showMessage = (type, msg) => {
		if(type === "ERROR") message.error(msg);
		else if(type === "SUCCESS") message.success(msg);
	}

	const formatData = (sales) => {
        let modData = [];
        console.log(sales);
        sales.map(item => {
            let date = new Date(item.createdDate)
			let saleItems = item.saleItemResponse.map(saleItem => {
				return saleItem.itemResponse.name;
			})
			console.log(saleItems);
            modData.push({
                key: item.id,
                status: item.paymentStatus,
                modified: formatDate(date),
                modifiedDate: date,
				salePrice: item.salePrice,
				saleItems: saleItems.toString(),
				customerName: item.customerResponse.name
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

  	return (
    <>
		<Layout>
			<Layout.Content  style={{padding:'20px 0'}}>
				<SalesList sales={data} reload={() => setReload(true)}/>
			</Layout.Content>
		</Layout>       
    </>
  )
}