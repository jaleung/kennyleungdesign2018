import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { portfoUrl, urlMask } from "./global";
import PortfolioItem from "./portfolioItem.jsx";

const Card = props => {
  return (
    <div className="card">
      <Link to={`/portfolio/${portfoUrl(props.title)}`}>
      <div className="thumbnail">
        <img
          width="100px"
          src={urlMask(props.field_thumbnail)}
          alt={props.title}
        />
      </div>
      <div className="title">{props.title}</div>
      </Link>
      <Route path={`/portfolio/:portfoTitle`} component={PortfolioItem} />
    </div>
  );
};

export default Card;
