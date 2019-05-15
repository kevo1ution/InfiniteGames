import React from "react";

class Todoitem extends React.Component {
	constructor() {
		super();
		this.state = {
			completed: false
        };
        
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(){
        this.setState((prevState) => {
            prevState.completed = !prevState.completed           
            return prevState
        });
    }

	render() {
        const completedStyle = {
            fontStyle: "italic",
            color: "#cdcdcd",
            textDecoration: "line-through"
        }
        const todoStyle = {

        }

		return (
			<div>
				<input
					type="checkbox"
					onChange={this.handleChange}
					checked={this.state.completed}
				/>
				<p style={this.state.completed ? completedStyle : todoStyle}>{this.props.content.text}</p>
			</div>
		);
	}
}

export default Todoitem;
