import { Affix, Avatar, Breadcrumb, Col, Divider, Row, Space, Table, Tag, Typography } from "antd"
import Link from "next/link"
import { ReloadOutlined, HomeOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableSearchBar from "../TableSearchBar/TableSearchBar";
import { useEffect, useState } from "react";

const SalesList = ({sales, reload}) => {

    const [data, setData] = useState(sales);
    const [loading, setLoading] = useState(false)

    const handleChange = (val) => {
        console.log(val);
        if(val.length <= 2) {
            setData(sales)
        }
        else if(val.length > 2){
            let result = []
            let rest = [];
            let dat = sales.filter(sale => {
                return sale.saleItems.includes(val);
            })
            setData(dat);
        }
    }

    useEffect(() => {
        setData(sales)
    }, [sales])

    const columns = [
        {
            title: 'Bill Id',
            dataIndex: 'key',
            // onFilter: (value, record) => record.name.indexOf(value) === 0,
            // sorter: (a, b) => a.name.length - b.name.length,
            align: 'left'
        },
        {
            title: 'Timestamp',
            dataIndex: 'modified',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.modifiedDate - b.modifiedDate,
            align: 'left'
        },
        {
            title: 'Payment Status',
            dataIndex: 'status',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.available - b.available,
            align:'center',
            render: (status) => {
                return <Tag color={status === "PAID" ? "green" : "red"}>{status}</Tag>
            }
        },
        {
            title: 'Amount',
            dataIndex: 'salePrice',
            align: 'left'
        },
        {
            title: 'Sale Items',
            dataIndex: 'saleItems',
            align: 'left',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            align:'left'
        }
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) => (
        //       <Space size="middle" split={<><Divider /></>}>
        //         <DeleteOutlined style={{cursor:'pointer', fontSize:'16px', color: '#2B7A0B'}}  onClick={() => showDeleteModal(record)}/>
        //         <EditOutlined style={{cursor:'pointer', fontSize:'16px', color: '#2B7A0B'}} onClick={() => showAddEditModal("Edit", record)}/>
        //         {/* <AiFillDelete size='20px' style={{cursor:'pointer'}}  onClick={() => showDeleteModal(record)}/>
        //         <AiFillEdit size='20px' style={{cursor:'pointer'}} onClick={() => showAddEditModal("Edit", record)}/> */}
        //       </Space>
        //     ),
        //     align:'center'
        // },
    ]
	

  return (
    <>
        <Affix>
            <Row justify="start" style={{margin:'0 0 10px 0', backgroundColor:'whitesmoke'}} align='middle'>
                <Col xl={3} lg={2} md={1} sm={0} xs={0}></Col>
                <Col xl={6} lg={7} md={8} sm={11} xs={12} style={{padding:'0 10px'}}>
                    <Space size='large' split={<Divider />}>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link href="/">
                                    <a style={{color: '#2B7A0B'}}>
                                        <Space><HomeOutlined style={{fontSize:'18px'}}/>Home</Space>
                                    </a>
                                </Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <Avatar
                            icon={<ReloadOutlined style={{color: '#2B7A0B'}}/>} 
                            style={{background:'transparent', cursor:'pointer'}}
                            onClick={() => reload()}
                        />
                    </Space>
                </Col>
                <Col xl={6} lg={6} md={6} sm={2} xs={12}></Col>
                <Col xl={6} lg={7} md={8} sm={11} xs={24} style={{padding:'0 5px'}}>
                    <TableSearchBar handleChange={handleChange} items={sales}  placeholder="Search Item name..."/>
                </Col>
                <Col xl={3} lg={2} md={1} sm={0} xs={0}></Col>
            </Row>
        </Affix>
        <Row justify="center">
            <Col xl={18} lg={20} md={22} sm={24} xs={24}>
                <Table 
                    bordered={true}
                    loading={loading}
                    columns={columns}
                    dataSource={data}
                    // onChange={onChange}
                    showSorterTooltip={false}
                    size='large'
                    pagination={{
                        position: ['bottomCenter'],
                    }}
                />
            </Col>
        </Row>
    </>
  )
}

export default SalesList