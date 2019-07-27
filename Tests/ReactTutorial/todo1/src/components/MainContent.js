import React from "react";
import Todoitem from "./Todoitem";
import todoData from "./todoData";

class MainContent extends React.Component {
	constructor() {
		super();
		this.state = {
			todos: todoData,
			logged: false
		};
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(){
		this.setState(prevstate => {
			return { logged: !prevstate.logged };
		});
	}

	render() {
		const items = this.state.todos.map(props => (
			<Todoitem key={props.id} content={props} />
		));

		return (
			<div>
				{items}
				{this.state.logged ? <h1>you are logged in</h1> : <h1>you are logged out</h1>}
				<button
					onClick={this.handleClick}
				>
					{this.state.logged ? "logout" : "login"}
				</button>
			</div>
		);
	}
}

export default MainContent;
