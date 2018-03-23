import React, { Component } from "react";
import "./App.css";
import Axios from "axios";

const CardList = (props) => {
  return <div>{props.cards.map(card => <Card key={card.uuid} {...card}/>)}</div>;
};

const Card = props => {
  return (
    <div className="card">
      <div className="thumbnail">
        <img width="100px" src={props.field_thumbnail} alt={props.title} />
      </div>
      <div className="title">{props.title}</div>
    </div>
  );
};
class App extends Component {
  state = {
    cards: []
  }
  componentDidMount() {
    Axios.get(`https://35.189.186.209/portfolios?_format=json`).then(
      resp => {
        this.setState(prevState => ({
          cards: prevState.cards.concat(resp.data)
        }));
        console.log(this.state.cards);
      }
    );
  }
  render() {
    return (
      <div className="App">
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

export default App;
