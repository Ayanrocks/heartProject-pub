import React, {useEffect} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {setLoggedIn, setUserData} from "./actions";
import {Layout, Typography} from "antd";
import "./App.less"
import {useMediaQuery} from 'react-responsive'
// Views
import About from "./views/About/About";
import Signup from "./views/Signup/Signup";
// Components
import Navbar from "./components/Navbar";
import Home from "./views/Home/Home";
import Dashboard from "./views/Dashboard/Dashboard";
import axios from "axios";
import Login from "./views/Login/Login";
import ComingSoon from "./views/ComingSoon/ComingSoon";
import NotFound from "./views/NotFound/NotFound";

const {Title} = Typography;

const App = (props) => {
	useEffect(() => {
		axios.get("/user/loggedIn", {withCredentials: true}).then(async (res) => {
			await props.setUserData(res.data)
			await props.setLoggedIn(true)
		}).catch(async () => {
			await props.setLoggedIn(false)
			await props.setUserData({})
		})
	})

	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-device-width: 1024px)'
	})
	return (
		<>
			{
				isDesktopOrLaptop ?
					(<Router>
						<Route component={Navbar}/>
						<Switch>
							<Route exact path="/">
								{props.loggedIn ? <Redirect to="/dashboard"/> : <Home/>}
							</Route>
							<Route path="/signup" exact>
								{props.loggedIn ? <Redirect to="/dashboard"/> : <Signup/>}
							</Route>
							<Route path="/login" exact>
								{props.loggedIn ? <Redirect to="/dashboard"/> : <Login/>}
							</Route>
							<Route path="/contact" exact component={ComingSoon}/>
							<Route path="/about" exact component={About}/>
							<ProtectedRoute path="/dashboard" component={Dashboard}
							                loggedIn={props.loggedIn}
							                exact/>
							<Route path="*" component={NotFound}/>
						</Switch>
					</Router>) :
					<Layout style={{
						height: '100vh',
						width: '100%',
						margin: '0 auto',
						textAlign: 'center',
						color: '#f11d50',
						padding: '5rem'
					}}>
						<Title style={{color: '#f11d50'}} level={2}>Whoa! Whoa! Looks like we weren't there
							yet.</Title>
						<Title style={{color: '#a4243f'}} level={4}>But we will get there. In the meantime try
							to open this site with a device greater than 1024px. (May be your computer <span
								role="img" aria-label="Wink">&#128521;</span>)</Title>
						<div className="mobile__bg"></div>
					</Layout>
			}
		</>
	);
}

const ProtectedRoute = ({component: Component, loggedIn, ...rest}) => (
	<Route {...rest} render={(props) => (loggedIn ? <Component {...props} />
			: <Redirect to='/'/>
	)}/>
)

function mapStateToProps({auth}) {
	const {loggedIn} = auth
	return {loggedIn}
}


export default connect(mapStateToProps, {setLoggedIn, setUserData})(App);
