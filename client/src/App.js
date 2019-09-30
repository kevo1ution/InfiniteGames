import React from "react";
import logo from "./logo.svg";
import Board from "./component/Board";
import SocketHandler from "./component/hoc/socketHandler"
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <board board={[[1, 1, 1],[1, 1, 1],[1, 2, 3]]} />
      </div>
    );
  }
}

export default App;
