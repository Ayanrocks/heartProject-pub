import React from 'react';

const TeamCards = ({name, desig, url, image}) => {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="team__cards"
		>
			<div className="team__cards__background">
				<div className="team__cards__background__shadow"/>
				<div
					className="team__cards__image"
					style={{'backgroundImage': `url(profilePic/${image})`}}
				/>
			</div>
			<div className="team__cards__content">
				<h2 className="team__cards__name">{name}</h2>
				<p className="team__cards__desig">{desig}</p>
			</div>
		</a>
	)
}

export default TeamCards
