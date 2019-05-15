import React from "react";
import Footer from "./Footer";
import MainContent from "./MainContent";
import Header from "./Header";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			textarea: "default text",
			firstName: "",
			loading: false,
			isFriendly: true,
			character: {},
			gender: "default"
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
		const { name, value, type, checked } = event.target;
		this.setState({
			[name]: type === "checkbox" ? checked : value
		});
	}

	//runs everytime there is a state change or render is called
	render() {
		return (
			<div>
				{/* Formik */}
				<label>
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
				</label>
				<label>
					<textarea
						name="textarea"
						value={this.state.textarea}
						onChange={this.handleChange}
					/>
				</label>
				<br />
				<label>
					<input
						type="checkbox"
						name="isFriendly"
						checked={this.state.isFriendly}
						onChange={this.handleChange}
					/> Is friend? 
				</label>
				<br />
				<label>
					<input
						type="radio"
						name="gender"
						value="male"
						checked={this.state.gender === "male"}
						onChange={this.handleChange}
					/> Male? 
				</label>
				<br />
				<label>
					<input
						type="radio"
						name="gender"
						value="female"
						checked={this.state.gender === "female"}
						onChange={this.handleChange}
					/> female? 
				</label>

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
