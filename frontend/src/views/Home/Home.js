import React, {Component} from "react";
import {Button, Modal} from 'antd';
import GettingStarted from "../../components/GettingStarted";
import Heart from "../../components/Heart";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import HeartIcon from "../../assets/heart-icon.svg";
import Chart from "../../assets/graph.svg";

class Home extends Component {
	constructor() {
		super();
		this.state = {
			showCookieModal: false
		}
	}

	componentDidMount() {
		const showCookieModalS = localStorage.getItem('showCookieModal')
		if (showCookieModalS !== null) {
			const showCookieModal = showCookieModalS === "true"
			this.setState({showCookieModal})
		} else {
			this.setState({showCookieModal: true})
		}
	}

	handleCookieModalOk = () => {
		this.setState({showCookieModal: false})
		localStorage.setItem('showCookieModal', false)
	}

	render() {
		return (
			<div className="main">
				<section id="home">
					{this.state.showCookieModal && <Modal
						title="Cookie Usage"
						maskClosable={false}
						style={{top: '65%'}}
						closable={false}
						visible={this.state.showCookieModal}
						mask={false}
						onOk={this.handleCookieModalOk}
						footer={[
							<Button key="submit" type="primary" onClick={this.handleCookieModalOk}>
								I got Cookies :)
							</Button>
						]}
					>
						<p>To improve our User Experience of the overall app we uses cookies to give improved
							and personalised results, this also helps us
							increase our security of the overall app. By using this app you are agreeing to our
							cookie usage policy.</p>
					</Modal>}
					<div className="content  mt-2">
						<div className="row">
							<div className="container">
								<div className="home__content">
									<div className="col-md">
										<div className="flex-c">
											<h1>
												Live in peace, not <br/>
												in agony
											</h1>
											<h3 className="mt-2">Check your heart without waiting.</h3>
											<div className="mt-4">
												<GettingStarted/>
											</div>
										</div>
									</div>
									<div className="col-md">
										<div className="heart">
											<Heart/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section id="cards">
					<div className="card_container">
						<Card
							img={HeartIcon}
							body="Created for the patients who have to wait for the doctor to tell your heart condition"
						/>
					</div>
				</section>
				<section id="charts">
					<div className="charts">
						<div className="charts__heading">
							<h1>Cardiovascular Diseases are Increasing</h1>
						</div>
						<div className="charts__img">
							<img src={Chart} alt="Cardiovascular Graph"/>
						</div>
					</div>
				</section>
				<section id="getStarted">
					<div className="getStarted">
						<div className="getStarted__heading">
							<h1>Don't Wait, Get Started Now</h1>
						</div>
						<GettingStarted/>
					</div>
				</section>
				<Footer/>
			</div>
		);
	}
}

export default Home;
