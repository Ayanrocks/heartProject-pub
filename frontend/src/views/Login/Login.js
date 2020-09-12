import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {setLoggedIn, setUserData} from "../../actions";
import Footer from "../../components/Footer";
import Form from "../../components/Form";
import Input from "../../components/Input";
import {Link, useLocation} from "react-router-dom";
import {notification} from "antd";

const Login = (props) => {
	const {pathname} = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [disabled, setDisabled] = useState(false)


	const openNotificationWithIcon = (type, message, description) => {
		notification[type]({
			message,
			description
		});
	};

	const onSubmit = () => {
		if (email && password) {
			setDisabled(true)
			axios.post("/login", {
					email,
					password
				},
				{
					withCredentials: true
				}
			).then((res) => {
				if (res.status === 200) {
					axios.get("/user/loggedIn", {withCredentials: true}).then(async (res) => {
						openNotificationWithIcon('success', 'Logged In', 'Redirecting')
						await props.setUserData(res.data)
						await props.setLoggedIn(true)
						// props.history.push("/dashboard")
					}).catch(e => {
						props.setLoggedIn(false)
					})
				}
			}).catch((e) => {
				// alert(e.response.data)
				openNotificationWithIcon('error', 'Error Logging In', 'Something Went Wrong!!. Please try again')
				openNotificationWithIcon('error', 'Error Details', e.response.data)
				setDisabled(false)
				props.setLoggedIn(false)
			})
		} else {
			openNotificationWithIcon('error', 'Form Error', "Please Fill all the fields")
		}
	}

	return (
		<div>
			<section id="login">
				<Form title="Login" submit={onSubmit} disabled={disabled}>
					<Input type="email" title="Email" onChange={(e) => setEmail(e.target.value)}/>
					<Input type="password" title="Password" onChange={(e) => setPassword(e.target.value)}/>
					{!disabled && <Link to="/signup" className="form__switcher">
						Don't have an account? Sign up instead
					</Link>}
				</Form>
			</section>
			<Footer/>
		</div>
	);
}

export default connect(null, {setLoggedIn, setUserData})(Login)
