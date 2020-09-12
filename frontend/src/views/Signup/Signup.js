import React, {useEffect, useState} from "react";
import Footer from "../../components/Footer";
import Form from "../../components/Form";
import Input from "../../components/Input";
import {Link, useLocation} from "react-router-dom";
import axios from 'axios';
import {notification} from "antd";

export default function Signup() {
	const {pathname} = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	const [name, setName] = useState('')
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
		if (name && email && password) {
			setDisabled(true)
			axios.post("/signup", {
				name, email, password
			}).then(() => {
				openNotificationWithIcon('success', 'Sign up Complete', "Please Close This Page and Open your email instead")
			}).catch(() => {
				openNotificationWithIcon('error', 'Sign up Failed', "Something Went Wrong. Please try again")
				setDisabled(false)
			})
		} else {
			openNotificationWithIcon('error', 'Form Error', "Please Fill all the fields")
		}
	}

	return (
		<div>
			<section id="signup">
				<Form title="Sign Up" submit={onSubmit} disabled={disabled}>
					<Input type="title" title="Name" onChange={(e) => setName(e.target.value)}/>
					<Input type="email" title="Email" onChange={(e) => setEmail(e.target.value)}/>
					<Input type="password" title="Password" onChange={(e) => setPassword(e.target.value)}/>
					{!disabled && <Link to="/login" className="form__switcher">
						Already have an account? Login instead
					</Link>}
				</Form>
			</section>
			<Footer/>
		</div>
	);
}
