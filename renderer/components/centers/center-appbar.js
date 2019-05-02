import React from 'react'
import { Row, Col, Button } from 'antd'

const size = 'default'

export default () => {
	return (
		<div>
            <Row>
                <Col span={14}/>
                <Col span={5}>
                    <Button type="primary" shape="round" icon="file-excel" size={size}>Upload excel</Button>
                </Col>    
                <Col span={5}>
                    <Button type="primary" onClick={() => console.log('Hello')} shape="round" icon="plus-circle" className="add-new-center" size={size}>Add new center</Button>
                </Col>
            </Row>
		</div>
	);
}
