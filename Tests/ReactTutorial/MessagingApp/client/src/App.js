import React from "react";
import "./App.css";
import Customers from "./components/customers/customers";

import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

socket.on('messages', function(data){
  alert(data.hello);
})

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
