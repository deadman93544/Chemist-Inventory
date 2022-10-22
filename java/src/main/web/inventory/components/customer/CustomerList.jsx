import {Avatar, Breadcrumb, Button, Checkbox, Col, Divider, message, Modal, Row, Space, Table} from 'antd'
import { useEffect, useState } from 'react'
import {AiFillDelete, AiFillEdit, AiOutlineHome, AiOutlinePlus} from 'react-icons/ai'
import CustomerForm from './CustomerForm';
import { deleteCustomer } from '../../controller/customer';
import TableSearchBar from '../TableSearchBar/TableSearchBar';
import { ReloadOutlined, HomeOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';


const CustomerList = ({items, handleReload}) => {


    const [loading, setLoading] = useState(false);
    const [modalMode, setModalMode] = useState("");
    const [addEditModalVisible, setAddEditModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [currentItem, setCurrentItem] = useState(null);
    const [data, setData] = useState(null);

    const handleChange = (val) => {
        console.log(val);
        if(val.length <= 2) {
            setData(items)
        }
        else if(val.length > 2){
            let dat = items.filter(customer => {
                return customer.name.includes(val)
            })
            setData(dat)
        }
    }

    useEffect(() => {
        setData(items)
    }, [items])

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const handleAddItem = (val) => {
        console.log(val);
        hideAddEditModal();
    }

    const handleEditItem = (val) => {
        console.log(val);
        hideAddEditModal();
    }

    const showAddEditModal = (mode, item) => {
        console.log(item);
        setCurrentItem(item);
        setModalMode(mode);
        console.log("Mode = ", mode);
        console.log(item);
        setAddEditModalVisible(true)
    }

    const hideAddEditModal = () => {
        setModalMode("");
        setAddEditModalVisible(false)
        setCurrentItem(null);
    }

    const showDeleteModal = (item) => {
        setDeleteModalVisible(true);
        setCurrentItem(item)
    }

    const hideDeleteModal = () => {
        setDeleteModalVisible(false);
        setCurrentItem(null);
    }

    const handleDelete = async () => {
        let item = currentItem
        let res = await deleteCustomer(item.key);
        setDeleteModalVisible(false);
        if(res.data === 200){
            successMessage("Customer " + item.name + " deleted successfully");
        }
        else {
            errorMessage("Error deleting the customer " + item.name);
        }
        setCurrentItem(null);
        handleReload(true)
    }

    const handleAddEditMessage = (msg, res) => {
        console.log(msg);
        hideAddEditModal();
        if (res === 200){
            successMessage(msg);
        }
        else {
            errorMessage(msg)
        }
        handleReload()
    }

    const successMessage = (msg) => {
        message.success(msg);
    }

    const errorMessage = (msg) => {
        message.error(msg);
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            align: 'left'
        },
        {
            title: 'Contact',
            dataIndex: 'phoneNum',
            // defaultSortOrder: 'descend',
            align: 'left'
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.available - b.available,
            align:'center'
        },
        {
            title: 'Last Modified',
            dataIndex: 'modified',
            sorter: (a, b) => a.modifiedDate - b.modifiedDate,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle" split={<><Divider /></>}>
                <DeleteOutlined style={{cursor:'pointer', fontSize:'16px', color: '#2B7A0B'}}  onClick={() => showDeleteModal(record)}/>
                <EditOutlined style={{cursor:'pointer', fontSize:'16px', color: '#2B7A0B'}} onClick={() => showAddEditModal("Edit", record)}/>
                {/* <AiFillDelete size='20px' style={{cursor:'pointer'}}  onClick={() => showDeleteModal(record)}/>
                <AiFillEdit size='20px' style={{cursor:'pointer'}} onClick={() => showAddEditModal("Edit", record)}/> */}
              </Space>
            ),
            align:'center'
          },
    ]

    return (
        <>
            <Row justify="start" style={{margin:'10px 0'}} align='middle'>
                <Col xl={3} lg={2} md={1} sm={0} xs={0}></Col>
                <Col xl={6} lg={7} md={8} sm={11} xs={12} style={{padding:'0 10px'}}>
                    <Space size='large' split={<Divider />}>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <a href="/" style={{color: '#2B7A0B'}}>
                                    <Space><HomeOutlined style={{fontSize:'18px'}}/>Home</Space>
                                </a>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <Avatar 
                            icon={<ReloadOutlined style={{color: '#2B7A0B'}}/>} 
                            style={{background:'transparent', cursor:'pointer'}}
                            onClick={() => handleReload()}
                        />
                    </Space>
                </Col>
                <Col xl={6} lg={6} md={6} sm={2} xs={12} style={{display:'flex', justifyContent:'right', paddingRight:'2vw'}}>
                    <Button 
                        shape="round" 
                        style={{border:'1px solid #2B7A0B', color:'#2B7A0B'}}
                        icon={<PlusOutlined style={{fontWeight:'bolder'}}/>}
                        size="large"
                        onClick={() => showAddEditModal("Add", null)}
                    >
                        Add
                    </Button>
                </Col>
                <Col xl={6} lg={7} md={8} sm={11} xs={24} style={{padding:'0 5px'}}>
                    
                    <TableSearchBar handleChange={handleChange} items={items}  placeholder="Search Item name..."/>
                </Col>
                <Col xl={3} lg={2} md={1} sm={0} xs={0}></Col>
            </Row>
            <Row justify="center">
                <Col xl={18} lg={20} md={22} sm={24} xs={24}>
                    <Table 
                        bordered={true}
                        loading={loading}
                        columns={columns}
                        dataSource={data}
                        onChange={onChange}
                        showSorterTooltip={false}
                        size='large'
                        pagination={{
                            position: ['bottomCenter'],
                        }}
                    />
                </Col>
            </Row>
            <Modal 
                title={`${modalMode} Customer`}
                visible={addEditModalVisible}
                onOk={modalMode === "Add" ? handleAddItem : modalMode === "Edit" ? handleEditItem : {}}
                onCancel={hideAddEditModal}
                centered
            >
                <CustomerForm 
                    initial={currentItem && currentItem} 
                    mode={modalMode === "Add" ? "Add" : modalMode === "Edit" ? "Edit" : null}
                    handlemessage={handleAddEditMessage}
                />
            </Modal>
            <Modal
                title={"Delete Customer"}
                visible={deleteModalVisible}
                onOk={handleDelete}
                onCancel={hideDeleteModal}
                centered
                okText="Delete"
                bodyStyle={{textAlign:'center'}}
            >
                <Row justify='center' align='center'>
                    <Col span={16}>
                        <h5>Are you sure you want to delete {currentItem && currentItem.name}</h5>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default CustomerList