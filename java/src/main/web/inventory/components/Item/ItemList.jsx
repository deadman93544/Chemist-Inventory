import {Button, Checkbox, Col, Divider, message, Modal, Row, Space, Table} from 'antd'
import { useEffect, useState } from 'react'
import {AiFillDelete, AiFillEdit, AiOutlinePlus} from 'react-icons/ai'
import ItemForm from './ItemForm';
import { deleteInventoryItem, fetchInventoryItem, fetchInventoryList } from '../../controller/item';

const ItemList = ({items, handleReload, addItem, disableAdd}) => {

    const [loading, setLoading] = useState(false);
    const [modalMode, setModalMode] = useState("");
    const [addEditModalVisible, setAddEditModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [currentItem, setCurrentItem] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        if(addItem){
            showAddEditModal("Add", null);
        }
    }, [addItem])

    useEffect(() => {
        setLoading(true);
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
        // console.log(modData);
        setData(modData);
        setLoading(false)
    }, [items])

    const formatDate = (date) => {
        let hour = `${date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`}`
        let minute = `${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`
        let second = `${date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`}`
        let day = `${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`
        let month = `${date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`}`
        let year = `${date.getFullYear()}`
        return `${hour}:${minute}:${second}  ${day}/${month}/${year}`
    }

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
        disableAdd();
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
        let res = await deleteInventoryItem(item.key);
        setDeleteModalVisible(false);
        if(res.data === 200){
            successMessage("Item " + item.name + " deleted successfully");
        }
        else {
            errorMessage("Error deleting the item " + item.name);
        }
        // data.pop(item);
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
        // setReload(true);
        handleReload(true)
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
            title: 'Price',
            dataIndex: 'price',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
            align: 'left'
        },
        {
            title: 'Available',
            dataIndex: 'available',
            sorter: (a, b) => a.available - b.available,
            align:'center'
        },
        {
            title: 'Last Modified',
            dataIndex: 'modified',
            sorter: (a, b) => a.modifiedDate - b.modifiedDate,
            //   defaultSortOrder: 'descend',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="large" split={<><Divider /></>}>
                <AiFillDelete size='20px' style={{cursor:'pointer'}}  onClick={() => showDeleteModal(record)}/>
                <AiFillEdit size='20px' style={{cursor:'pointer'}} onClick={() => showAddEditModal("Edit", record)}/>
              </Space>
            ),
            align:'center'
          },
    ]

    return (
        <>
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
            {/* <Row justify='center' align='middle'>
                <Col span={10} style={{display:'flex', justifyContent:'center', padding:'10px'}}>
                    <Button type='primary' size='large' onClick={() => showAddEditModal("Add", null)}>
                        <Space>
                            <AiOutlinePlus />
                            Add
                        </Space>
                    </Button>
                </Col>
            </Row> */}
            <Modal 
                title={`${modalMode} Item`}
                visible={addEditModalVisible}
                onOk={modalMode === "Add" ? handleAddItem : modalMode === "Edit" ? handleEditItem : {}}
                onCancel={hideAddEditModal}
                centered
            >
                <ItemForm 
                    initial={currentItem && currentItem} 
                    mode={modalMode === "Add" ? "Add" : modalMode === "Edit" ? "Edit" : null}
                    handlemessage={handleAddEditMessage}
                />
            </Modal>
            <Modal
                title={"Delete Item"}
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

export default ItemList