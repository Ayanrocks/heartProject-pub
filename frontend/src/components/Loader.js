import React from 'react';
import {Layout} from "antd";
import {LoadingOutlined} from '@ant-design/icons';

const Loader = () => {
	return (
		<Layout style={{
			position: 'absolute',
			top: '15%',
			left: '58%',
			backgroundColor: '#fff',
			borderRadius: '100%',
			// height: '2rem',
			// width: '2rem',
			zIndex: 999,
			padding: '1rem',
			boxShadow: '0 0 10px rgba(0,0,0,0.4)'
		}}>
			<LoadingOutlined style={{fontSize: '2rem'}}/>
		</Layout>
	)
}

export default Loader;
