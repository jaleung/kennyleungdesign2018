import React from "react";
import { Link } from "react-router-dom";
import { portfoUrl, urlMask } from "./global";

const Card = props => {
  return (
    <div className="card">
      <Link to={`/portfolio/${portfoUrl(props.title)}`}>
        <div>
          <div className="thumbnail">
            <img
              width="100px"
              src={urlMask(props.field_thumbnail)}
              alt={props.title}
            />
          </div>
          <div className="title">{props.title}</div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
