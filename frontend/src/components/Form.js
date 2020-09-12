import React, {Component} from "react";

export default class Form extends Component {
	render() {
		return (
			<div className="form__container">
				<div className="form__title">
					<h1>{this.props.title}</h1>
				</div>
				<div className="form__content">
					{this.props.children}
					<button onClick={this.props.submit}
					        className={this.props.disabled ? "submit-btn disabled-btn" : "submit-btn"}
					        disabled={this.props.disabled}>{this.props.title}</button>
				</div>
			</div>
		);
	}
}
