import React, { Component } from "react";
import "./App.css";

let fetchedData = [{
  name: "Enigma",
  thumbnail: "http://placehold.it/100x100"
}];

const CardList = (props) => {
  return <div>{props.cards.map(card => <Card key={card.name} {...card}/>)}</div>;
};

const Card = props => {
  return (
    <div className="card">
      <div className="thumbnail">
        <img src={props.thumbnail} alt={props.name} />
      </div>
      <div className="title">{props.name}</div>
    </div>
  );
};
class App extends Component {
  render() {
    return (
      <div className="App">
        <CardList cards={fetchedData} />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
