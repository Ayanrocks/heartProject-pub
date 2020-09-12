/*
 * Navbar component
 * @author Ayanrocks
 */

import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button} from 'antd';
import GettingStarted from "./GettingStarted";
import {connect} from "react-redux";
import {setLoggedIn, setUserData} from "../actions";
import axios from 'axios';
import Logo from "../assets/heartylogo.svg"

class Navbar extends Component {

	logoutHandler = () => {
		axios.get("/user/logout", {withCredentials: true}).then(res => {
			this.props.setUserData({})
			this.props.setLoggedIn(false);
		}).catch(e => {
			alert("Unable to Logout. Remove Cookies");
			this.props.setUserData({})
			this.props.setLoggedIn(false);
		})
	}

	render() {
		return (
			<nav className={this.props.loggedIn ? "navbar-loggedIn" : ""}>
				<div className="navbar">
					<div className="navbar__left">
						<div className="brand">
							<Link to="/" className="brand__title">
								<img src={Logo} className="brand__logo" alt="Hearty Logo"/>
							</Link>
						</div>
					</div>
					{this.props.loggedIn ?
						<Button style={{
							boxShadow: '0 2px 7px rgba(214,29,80, 0.3)'
						}} onClick={this.logoutHandler} type="primary" shape="round" size='large'>
							Logout
						</Button>
						: this.props.location.pathname === "/" && (
						<div className="navbar__right">
							<div className=" menu">
								<div className="menu__signin">
									<Link to="/login" className="signin__text">
										Sign In
									</Link>
								</div>
								<div className="menu__gettingStarted">
									<GettingStarted/>
								</div>
							</div>
						</div>
					)}
				</div>
			</nav>
		);
	}
}

function mapStateToProps({auth}) {
	const {loggedIn} = auth
	return {loggedIn}
}

export default connect(mapStateToProps, {setLoggedIn, setUserData})(Navbar);
