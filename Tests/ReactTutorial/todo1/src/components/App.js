import React from "react";
import Footer from "./Footer";
import MainContent from "./MainContent";
import Header from "./Header";


class App extends React.Component {
	constructor(){
		super();
		this.state = {
			firstName: "",
			loading: false,
			character : {}
		};
		this.handleChange = this.handleChange.bind(this)
	};

	//runs only once when the component mounts
	componentDidMount(){
		this.setState({loading: true})
		fetch("https://swapi.co/api/people/1")
			.then(response => response.json())
			.then(data => {
				this.setState({character : data, loading: false})
			})
	}

	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	//runs everytime there is a state change or render is called
	render() {
		return (
			<div>
				<form>
					<input type="text" name="firstName" placeholder="First Name" onChange={this.handleChange} />
					<input type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange} />
				</form>
				<h1>{this.state.firstName} {this.state.lastName}</h1>
				<Header />
				<MainContent />
				<Footer />
			</div>
		);
	};
}

export default App;
