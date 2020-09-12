import React, {Component} from 'react';
import {connect} from "react-redux";
import {Layout, Menu} from 'antd';
import {AuditOutlined, HeartFilled, UserOutlined} from '@ant-design/icons';
import CheckHeart from "../../components/CheckHeart";
import Profile from "../../components/Profile";
import axios from 'axios';
import {setUserReports} from "../../actions";
import PreviousReports from "../../components/PreviousReports";
import Loader from "../../components/Loader";

const {Sider, Content} = Layout;

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sideBarState: "1",
			showLoader: false
		}
	}

	componentDidMount() {
		if (this.props.userData && this.props.reports.length === 0) {
			this.setShowLoader(true)
			axios.get(`/user/data/report/get/${this.props.userData.id}`, {withCredentials: true})
				.then(async (res) => {
					await this.props.setUserReports(res.data.reports)
					this.setShowLoader(false)
				}).catch(e => {
				this.setShowLoader(false)
				console.error(e)
			})
		}
	}

	setShowLoader = (value) => {
		this.setState({showLoader: value})
	}

	render() {
		return (
			<div id="dashboard">
				<div className="dashboard__content">
					<Layout style={{
						height: "98vh"
					}}>
						{this.state.showLoader && <Loader/>}
						<Sider theme="dark" width="35rem" style={{
							overflow: 'auto',
							height: '98vh',
							color: "#e5e5e5",
						}}>
							<Menu onClick={(e) => this.setState({sideBarState: e.key})} theme="dark" mode="inline"
							      defaultSelectedKeys={[this.state.sideBarState]}>
								<Menu.Item key="1" icon={<HeartFilled/>}>
									Check Heart
								</Menu.Item>
								<Menu.Item key="2" icon={<AuditOutlined/>}>
									Previous Results
								</Menu.Item>
								<Menu.Item key="3" icon={<UserOutlined/>}>
									Profile
								</Menu.Item>
							</Menu>
						</Sider>
						<Content style={{
							backgroundColor: "#ffffff",
						}}>
							{this.state.sideBarState === "1" && <CheckHeart setShowLoader={this.setShowLoader}/>}
							{this.state.sideBarState === "2" && <PreviousReports/>}
							{this.state.sideBarState === "3" && <Profile/>}
						</Content>
					</Layout>
				</div>
			</div>
		);
	}
}

function mapStateToProps({user, auth}) {
	const {reports} = user
	const {userData} = auth
	return {reports, userData}
}

export default connect(mapStateToProps, {setUserReports})(Dashboard);
