import React, { Component } from "react";
import "./message.css";

class Message extends Component {

	render() {
		return (
			<div class={this.props.data.user ? "container darker" : "container"}>
				<p>{this.props.data.msg}</p>
				<span class="time-left">{this.props.data.time}</span>
			</div>
		);
	}
}

export default Message;
