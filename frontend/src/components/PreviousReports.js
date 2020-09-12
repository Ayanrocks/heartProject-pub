import React from 'react';
import {connect} from "react-redux";
import {Layout, Typography} from 'antd';
import ReportCards from "./ReportCards";

const {Title} = Typography;


const PreviousReports = (props) => {
	return (
		<Layout style={{
			marginBottom: '5rem',
			overflowX: 'hidden',
			height: '90vh'
		}}>
			<Layout style={{
				padding: '10rem',
				display: 'flex',
			}}>
				{props.reports.length > 0 ? props.reports.map((r, i) => <ReportCards key={i}
				                                                                     reports={r}/>) :
					<Layout style={{
						textAlign: 'center'
					}}>
						<Title style={{color: '#f11d50'}} level={2}>No Reports Yet</Title>
						<div className="noreports__bg"/>
						<Title style={{color: '#e87474'}} level={4}>Goto Check Heart and Click the + sign to add some</Title>
					</Layout>}
			</Layout>
		</Layout>
	);
}


function mapStateToProps({user}) {
	const {reports} = user;
	return {
		reports
	}
}

export default connect(mapStateToProps)(PreviousReports);
