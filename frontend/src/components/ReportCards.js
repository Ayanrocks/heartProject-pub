import React from 'react';
import {Card, Descriptions, Layout} from 'antd';
import moment from "moment-timezone";

const ReportCards = ({reports}) => {
	return (
		<Card style={{width: '100%', textAlign: 'center', marginBottom: '5rem'}}>
			<Layout style={{
				backgroundColor: '#fff'
			}}>
				<Descriptions title="Reports Details" bordered column={3}>
					<Descriptions.Item
						label="Report Result">{reports.result === 0 ? "Heart is Fine" : "Heart may have a problem"}</Descriptions.Item>
					<Descriptions.Item
						label="Created At">{moment(reports.createdAt).tz("Asia/Kolkata").startOf('secons').fromNow()}</Descriptions.Item>
					<Descriptions.Item label="Age">{reports.age}</Descriptions.Item>
					<Descriptions.Item label="Thalassemia Rate">{reports.thalassemiaRate}</Descriptions.Item>
					<Descriptions.Item
						label="Chest Pain">{reports.chestPain === 1 ? "Light" : (reports.chestPain === 2 ? "Medium" : "Strong")}</Descriptions.Item>
					<Descriptions.Item
						label="Angina">{reports.angina === 1 ? "Yes" : "No"}</Descriptions.Item>
					<Descriptions.Item label="Heart Rate">{reports.heartRate}</Descriptions.Item>
					<Descriptions.Item label="Sex">{reports.sex === 0 ? 'Female' : "Male"}</Descriptions.Item>
				</Descriptions>
			</Layout>
		</Card>
	)
}

export default ReportCards;
