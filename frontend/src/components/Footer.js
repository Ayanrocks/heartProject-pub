import React from "react";
import {Link} from "react-router-dom";
import Logo from "../assets/heartylogo.svg";

const Footer = () => {
	return (
		<footer>
			<div className="footer">
				<div className="footer__content">
					<div className="footer__heading">
						<h1><img src={Logo} className="brand__logo" alt="Hearty Logo"/>Hearty.</h1>
					</div>
					<div className="footer__links flex-r">
						<div className="footer__links__about">
							<Link to="/about">About Us</Link>
						</div>
						<div className="footer__links__contact">
							<Link to="/contact">Contact Us</Link>
						</div>
					</div>
					<div className="footer__description">
						<p>&copy; All Rights Reserved. Hearty inc.</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
