import React from 'react'
import {Link} from "react-router-dom";

const NotFound = () => {
	return (
		<section id={"notfound"}>
			<div className="notfound">
				<div className="notfound__content">
					<div className="tag">
						<h1>Page Not Found</h1>
						<p>Looks like you took a wrong turn. Don't worry here is a link to get back on track</p>
						<Link to="/">Go To Right Track</Link>
					</div>
					<div className="notfound__bg"/>
					{/*<Heart/>*/}
				</div>
			</div>
		</section>
	)
}

export default NotFound;
