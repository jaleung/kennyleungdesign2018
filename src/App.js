import React, { Component } from "react";
import "./App.css";

let fetchedData = {
  name: 'Enigma',
  thumbnail: 'http://placehold.it/100x100'
};
const Card = (props) => {
  return (
    <div className="card">
      <div className="thumbnail">
        <img src={props.data.thumbnail} alt={props.name} />
      </div>
      <div className="title">{props.data.name}</div>
    </div>
  );
};
class App extends Component {
  render() {
    return (
      <div className="App">
        <Card data={fetchedData}/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
