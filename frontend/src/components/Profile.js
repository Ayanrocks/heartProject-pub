import React from 'react';
import {connect} from "react-redux";
import {Avatar, Badge, Card, Descriptions, Layout} from 'antd';
import {UserOutlined} from '@ant-design/icons';

const Profile = (props) => {
	return (
		<Layout style={{
			backgroundColor: "#ffffff",
			padding: 25,
			position: 'relative',
			marginBottom: '5rem'
		}}>
			<Card style={{
				boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
				margin: '0 auto 5rem auto',
				width: '80rem',
			}}>
				<Layout style={{
					backgroundColor: "#ffffff",
					margin: '0 auto',
					textAlign: 'center'
				}}>
					<Layout style={{
						backgroundColor: "#ffffff",
						margin: '0 auto',
					}}>
						<Avatar style={{
							margin: '0 auto'
						}} size={240} icon={<UserOutlined/>}/>
					</Layout>
					<Layout style={{
						backgroundColor: "#ffffff",
						margin: '5rem auto 3rem auto',
						width: '80%'
					}}>
						<Descriptions title="Patient Info" bordered column={1}>
							{props.userData.id && <Descriptions.Item
								label="Patient ID">{props.userData.id.slice(-7)}</Descriptions.Item>}
							<Descriptions.Item label="Patient Name">{props.userData.name}</Descriptions.Item>
							<Descriptions.Item label="Patient Email">{props.userData.email}</Descriptions.Item>
							<Descriptions.Item label="Patient Status"><Badge
								status="success" text="Verified"/></Descriptions.Item>
						</Descriptions>
					</Layout>
				</Layout>
			</Card>
		</Layout>
	)
}

function mapStateToProps({auth}) {
	const {userData} = auth;
	return {
		userData
	}
}

export default connect(mapStateToProps)(Profile)
