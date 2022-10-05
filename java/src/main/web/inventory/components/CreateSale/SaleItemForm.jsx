import { AutoComplete, Button, Card, Col, Form, Input, message, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { fetchInventoryList } from "../../controller/item";

const SaleItemForm = ({initial, onOk, onCancel }) => {

    const [form] = Form.useForm();
    const [items, setitems] =  useState([]);
    const [itemOptions, setItemOptions] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    // const [initValues, setInitValues] = useState({});

    const handleSubmit = (val) => {
      // console.log(val);
      if(selectedItem === null){
        errorMessage("Please select a valid Item")
      }
      else if(selectedItem !== null && (val.quantity === undefined || val.quantity === '') && (val.subQuantity === undefined || val.subQuantity === '')){
        errorMessage("Please select a quantity")
      }
      else if(val.expirationDate === undefined|| val.expirationDate === ''){
        errorMessage("Please select an expiration Date")
      }
      else if(val.quantity > selectedItem.quantity || (val.subQuantity > selectedItem.subQuantity && selectedItem.quantity - val.quantity <= 0)){
        errorMessage("There are only " + selectedItem.quantity + "." + selectedItem.subQuantity + " left in inventory")
      }
      else {
        if(val.quantity === undefined || val.quantity === '') val.quantity = 0;
        if(val.subQuantity === undefined || val.subQuantity === '') val.subQuantity = 0;
        let salePrice = selectedItem.itemPrice * val.quantity;
        if(selectedItem.itemDivisions > 0){
          salePrice = salePrice + (selectedItem.itemPrice * val.subQuantity / selectedItem.itemDivisions)
        }
        let obj = {
          quantity: val.quantity,
          subQuantity: val.subQuantity,
          itemRequest: selectedItem,
          saleItemPrice: salePrice,
          expirationDate: val.expirationDate,
          batchNumber: val.batchNumber,
        }
        // console.log(obj);
        onOk(obj);
      }
    }

    const fetchInventory = async () => {
        const {data, error} = await fetchInventoryList();
        if (error !== null) {
            errorMessage("Unable to load Inventory");
        }
        else {
            let temp = [];
            data.map(item => {
                temp.push({...item, label: item.name, value: item.name});
            })
            console.log(temp);
            setitems(temp);
        }
    }

    const onSearch = (txt) => {
        console.log(txt);
        setSelectedItem(null)
        if(!txt) {
            setItemOptions([]);
        }
        else{
            let modData = [] = items.filter(item =>  item.name.includes(txt.toUpperCase()));
            console.log(modData);
            setItemOptions(modData)
        }
    }

    const onSelect = (value, option) => {
        console.log(option);
        
        if(option.quantity > 0){
            setSelectedItem(option);
        }
        else{
          setSelectedItem(null)
          errorMessage(`Item ${option.name}'s quantity is not available in Inventory`)
        }
    }

    const successMessage = (msg) => {
        message.success(msg);
    }

    const errorMessage = (msg) => {
        message.error(msg);
    }

    useEffect(() => {
      form.resetFields();
      fetchInventory();
      if(initial !== {}){
        // setInitValues(initial);
        // setInitValues({
        //   item: initial.itemRequest,
        //   quantity: initial.quantity,
        //   expirationDate: initial.expirationDate,
        //   batchNumber: initial.batchNumber
        // })
        setSelectedItem(initial.itemRequest)
      }
    }, [initial])

  return (
    <>
      <Card bordered={false}>
        <Form
          style={{display:'flex'}}
          form={form}
          initialValues={
            initial === {} ? 
            {
              quantity: 0,
              subQuantity: 0,
            } :
            {
              item: initial.itemRequest,
              quantity: initial.quantity,
              subQuantity: initial.subQuantity,
              expirationDate: initial.expirationDate,
              batchNumber: initial.batchNumber
            }
          }
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <Row justify='center' style={{display: 'flex', flexDirection:'row'}} gutter={[24, 24]} align='middle'>
            <Col span={12}>
              <Form.Item
                label="Item"
                name="item"
                required
              >
                  <AutoComplete
                      allowClear={true}
                      autoFocus={true}
                      options={itemOptions}
                      onSelect={onSelect}
                      onSearch={onSearch}
                      onClear={() => setSelectedItem(null)}
                  />
              </Form.Item>
            </Col>

            <Col span={12} style={{padding:'0 100px'}}>
              <Space align="baseline" size="large">
                <Typography.Title level={5}>Price - </Typography.Title>
                <Typography.Paragraph style={{border:'1px solid gray', padding: '5px 30px', cursor:'not-allowed '}}>{selectedItem ? selectedItem.itemPrice : 0}</Typography.Paragraph>
              </Space>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="Quantity"
                name="quantity"
                required
              >
                <Input type="number" min={0}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Sub Quantity"
                name="subQuantity"
                required
              >
                <Input type="number" disabled={selectedItem && selectedItem.itemDivisions === 0} min={0} max={selectedItem && selectedItem.itemDivisions - 1}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Expiration Date"
                name="expirationDate"
                required
              >
                <Input type="date"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Batch Number"
                name="batchNumber"
                required
              >
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={12} style={{display:'flex', justifyContent:'center'}}>
              <Space>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                      OK
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="secondary" danger onClick={() => {form.resetFields();onCancel()}}>
                      Cancel
                  </Button>
                </Form.Item>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  )
}

export default SaleItemForm