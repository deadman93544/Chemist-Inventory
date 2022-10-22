import { Button, Row, Col, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';

const PageNotAvailable = () => {

    const router = useRouter();    

  return (
    <Row justify='center' style={{padding:'50px 0'}} gutter={[32, 32]}>
        <Col style={{display:'flex', justifyContent:'center'}} span={24}>
        <Typography.Text>This page is not ready</Typography.Text>
        </Col>
        <Col style={{display:'flex', justifyContent:'center'}} span={24}>
        <Button
            type="primary" 
            shape='round' 
            size='large' 
            onClick={() => {router.push(`/`)}}
        >
            Go to Home
        </Button>
        </Col>
    </Row>
  )
}

export default PageNotAvailable