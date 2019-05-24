import React from "react";
import "./App.css";
import Message from "./components/message/message"

import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

socket.on('messages', function(data){
});

class App extends React.Component {
	constructor() {
		super();
		this.state = {
		};
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className="App">
			</div>
		);
	}
}

export default App;
