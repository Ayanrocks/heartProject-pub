import React, {useEffect} from "react";
import Card from "../../components/Card";
import HeartIcon from "../../assets/heart-icon.svg";
import {useLocation} from "react-router-dom";
import TeamCards from "../../components/teamCards";

export default function About() {
	const {pathname} = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return (
		<section id="about">
			<Card
				img={HeartIcon}
				body="We are a team of aspiring engineers wanted to create great things in health care department"
			/>
			<div className="team">
				<div className="team__heading">
					<h1>Our Team</h1>
				</div>
				<div className="team__content">
					<TeamCards name="Ayan Banerjee" desig="Team Leader | Web" image="ayan.jpg"
					           url="https://www.facebook.com/ayan.banerjee.378"/>
					<TeamCards name="Debojotee Dutta" desig="Developer | ML Leader" image="debojotee.jpeg"
					           url="https://www.facebook.com/riyuga.nakanishi"/>
					<TeamCards name="Saswata Chatterjee" desig="EDA Expert | ML" image="saswata.jpg"
					           url="https://www.facebook.com/saswata.chatterjee.18"/>
					<TeamCards name="Sudipra Biswas" desig="Developer | Web" image="sudipra.jpg"
					           url="https://www.facebook.com/UserbUsY90"/>
					<TeamCards name="Swagata Sen" desig="Developer | ML" image="swagata.jpg"
					           url="https://www.facebook.com/sona.sen.1481"/>
					<TeamCards name="Madhumonti Paul" desig="Developer | ML" image="madhumonti.jpg"
					           url="https://www.facebook.com/madhumonti.paul.9"/>
					<TeamCards name="Suromita Roy" desig="Developer | ML" image="suromita.jpg"
					           url="https://www.facebook.com/suromita.roy.98"/>
				</div>
			</div>

			<div className="team">
				<div className="team__heading">
					<h1>Additional Thanks</h1>
				</div>
				<div className="team__content flex-c">
					<p>Dataset Provided By <em>Kaggle</em></p>
					<p>Logo Designed By <em>Debosmita Basu</em></p>
					<p>Additonal Illustrations Provided By <em>undraw.co</em></p>
				</div>
			</div>
		</section>
	);
}
