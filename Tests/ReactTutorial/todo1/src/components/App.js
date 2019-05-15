import React from "react";
import Footer from "./Footer";
import MainContent from "./MainContent";
import Header from "./Header";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			firstName: "",
			loading: false,
			character: {}
		};
		this.handleChange = this.handleChange.bind(this);
	}

	//runs only once when the component mounts
	componentDidMount() {
		this.setState({ loading: true });
		fetch("https://swapi.co/api/people/1")
			.then(response => response.json())
			.then(data => {
				this.setState({ character: data, loading: false });
			});
	}

	handleChange(event) {
		const {name, value} = event.target
		this.setState({
			[name]: value
		});
	}

	//runs everytime there is a state change or render is called
	render() {
		return (
			<div>
				<form>
					<input
						type="text"
						value={this.state.firstName}
						name="firstName"
						placeholder="First Name"
						onChange={this.handleChange}
					/>
					<input
						type="text"
						value={this.state.lastName}
						name="lastName"
						placeholder="Last Name"
						onChange={this.handleChange}
					/>
				</form>
				<h1>
					{this.state.firstName} {this.state.lastName}
				</h1>
				<Header />
				<MainContent />
				<Footer />
			</div>
		);
	}
}

export default App;
