import React, {Component} from 'react';
import {connect} from "react-redux";
import {
	Button,
	Form,
	InputNumber,
	Layout,
	Modal,
	notification,
	Popover,
	Select,
	Slider,
	Typography
} from 'antd';
import {PlusCircleFilled} from '@ant-design/icons';
import axios from "axios";
import ReportCards from "./ReportCards";
import {setUserReports} from "../actions";

const {Option} = Select;
const {Title} = Typography;

class CheckHeart extends Component {
	formRef = React.createRef();

	constructor(props) {
		super(props);
		this.state = {
			showAddNewModal: false,
			confirmLoading: false,
			angina: -1,
			chestPain: -1,
			heartRate: 50,
			thalassemiaRate: 0,
			age: -1,
			sex: -1
		}
	}

	openNotificationWithIcon = (type, message, description) => {
		notification[type]({
			message,
			description
		});
	};

	// Handle ok click on add new Modal
	handleAddNewModalOK = () => {
		this.setState({confirmLoading: true})
		const {angina, chestPain, heartRate, thalassemiaRate, age, sex} = this.state;
		if (angina !== -1 && chestPain !== -1 && sex !== -1) {
			const userData = {
				angina,
				chestPain,
				heartRate,
				thalassemiaRate,
				sex,
				age,
			}
			axios.post("/ml/user/report/predict", {...userData}, {
				withCredentials: true,
				json: true
			}).then((res) => {
				this.setState({
					confirmLoading: false,
					showAddNewModal: false,
					angina: -1,
					chestPain: -1,
					heartRate: 50,
					thalassemiaRate: 0,
					age: -1,
					sex: -1
				})
				const result = res.data
				if (result === 1) {
					this.openNotificationWithIcon('warning', 'Report Predictions', 'You may have a problem in your Heart. Better to check it out')
				} else if (result === 0) {
					this.openNotificationWithIcon('success', 'Report Predictions', 'You Heart is working fine')
				}
				this.setState({
						confirmLoading: false,
						showAddNewModal: false,
						angina: -1,
						chestPain: -1,
						heartRate: 50,
						thalassemiaRate: 0,
						age: -1,
						sex: -1
					}, () => {
						this.props.setShowLoader(true)
						axios.get(`/user/data/report/get/${this.props.userData.id}`, {withCredentials: true})
							.then(async (res) => {
								await this.props.setUserReports(res.data.reports)
								this.props.setShowLoader(false)
							}).catch(e => {
							console.error(e)
							this.props.setShowLoader(false)
						})
						this.formRef.current.resetFields();
					}
				)
			}).catch(e => {
				console.error(e)
				this.setState({
					confirmLoading: false,
					showAddNewModal: false,
					angina: -1,
					chestPain: -1,
					heartRate: 50,
					thalassemiaRate: 0,
					age: -1,
					sex: -1
				})
				this.props.setShowLoader(false)
			})
		} else {
			this.openNotificationWithIcon('error', 'Error  Submitting', 'Currently all the fields need to be filled before sending for better result')
			this.setState({confirmLoading: false})
			this.props.setShowLoader(false)
		}
		this.formRef.current.resetFields();
	}

	render() {
		return (
			<Layout style={{
				marginBottom: '5rem',
				overflowX: 'hidden',
				height: '90vh'
			}}>
				<Button onClick={() => this.setState({showAddNewModal: true})}
				        className="dashboard__fab" type="primary"
				        shape="circle"
				        style={{
					        boxShadow: '0 2px 7px 2px rgba(214,29,80, 0.5)',
					        zIndex: 999
				        }}
				        icon={<PlusCircleFilled style={{fontSize: 30}}/>} size="large"/>
				<Modal
					title="Add New Report"
					maskClosable={false}
					visible={this.state.showAddNewModal}
					confirmLoading={this.state.confirmLoading}
					onOk={this.handleAddNewModalOK}
					onCancel={() => this.setState({showAddNewModal: false})}
				>
					<Form
						ref={this.formRef}
						initialValues={{
							angina: this.state.angina,
							chestPain: this.state.chestPain,
							heartRate: this.state.heartRate,
							thalassemia: this.state.thalassemiaRate,
							age: this.state.age,
							sex: this.state.sex
						}}
					>
						<Popover placement="right"
						         content={(
							         <p>After exercising for a long period of time,<br/> do you feel
								         shortage of breathing,<br/> squeezing, heaviness of pain in the chest
							         </p>)}
						         title="Angina Type">
							<Form.Item
								label="Angina Type"
								name="angina"
								rules={[{required: true, message: 'Please input you chest pain'}]}
							>
								<Select style={{width: 220}}
								        onChange={(value) => this.setState({angina: value})}>
									<Option value={-1} disabled>Select Angina Type</Option>
									<Option value={0}>No</Option>
									<Option value={1}>Yes</Option>
								</Select>
							</Form.Item>
						</Popover>
						<Popover placement="right"
						         content={(<p>Rate your chest pain</p>)}
						         title="Chest Pain Type">
							<Form.Item
								label="Chest Pain Type"
								name="chestPain"
								rules={[{required: true}]}
							>
								<Select style={{width: 120}}
								        onChange={(value) => this.setState({chestPain: value})}>
									<Option value={-1} disabled>No Pain</Option>
									<Option value={1}>Light</Option>
									<Option value={2}>Medium</Option>
									<Option value={3}>Strong</Option>
								</Select>
							</Form.Item>
						</Popover>
						<Popover placement="right"
						         content={(<p>Max heart rate achieved by the patient</p>)}
						         title="Heart Rate">
							<Form.Item
								label="Heart Rate"
								name="heartRate"
								rules={[{required: true, message: 'Please input your username!'}]}
							>
								<Slider min={50}
								        max={220} onChange={(value) => this.setState({heartRate: value})}/>
							</Form.Item>
						</Popover>
						<Popover placement="right"
						         content={(<p>Do you have Thalassemia? (3 - mild, 6 - severe)</p>)}
						         title="Thalassemia Rate">
							<Form.Item
								label="Thalassemia Rate"
								name="thalassemia"
								rules={[{required: true}]}
							>
								<Slider min={0}
								        max={6} onChange={(value) => this.setState({thalassemiaRate: value})}/>
							</Form.Item>
						</Popover>
						<Popover placement="right"
						         content={(<p>Age (1 - min, 118 - max)</p>)}
						         title="Age">
							<Form.Item
								label="Age"
								name="age"
								rules={[{required: true}]}
							>
								<InputNumber max={118} min={1}
								             onChange={(value) => this.setState({age: value})}/>
							</Form.Item>
						</Popover>
						<Form.Item
							label="Sex"
							name="sex"
							rules={[{required: true}]}
						>
							<Select style={{width: 180}}
							        onChange={(value) => this.setState({sex: value})}>
								<Option value={-1} disabled>Select Gender</Option>
								<Option value={0}>F</Option>
								<Option value={1}>M</Option>
							</Select>
						</Form.Item>
					</Form>
				</Modal>
				<Layout style={{
					padding: '10rem',
					display: 'flex',
					marginBottom: '10rem'
				}}>
					{this.props.reports.length > 0 ? <Layout>{
							this.props.reports.slice(0, 5).map((r, i) =>
								<ReportCards key={i} reports={r}/>)}
							<p style={{textAlign: 'center'}}><em>More Reports are in Previous Reports Page</em></p>
						</Layout> :
						<Layout style={{
							textAlign: 'center'
						}}>
							<Title style={{color: '#f11d50'}} level={2}>No Reports Yet</Title>
							<div className="noreports__bg"/>
							<Title style={{color: '#e87474'}} level={4}>Click the + sign to add some</Title>
						</Layout>}
				</Layout>
			</Layout>
		);
	}
}

function mapStateToProps({auth, user}) {
	const {reports} = user;
	const {userData} = auth;
	return {
		userData, reports
	}
}

export default connect(mapStateToProps, {setUserReports})(CheckHeart);
