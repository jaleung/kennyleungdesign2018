import React from "react";
import { Link } from "react-router-dom";
import { portfoUrl, urlMask } from "./global";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";

const stylePaper = {
  background: '#fff',
  padding: 8
}

const styleImg = {
  width: '100%'
}

const Card = props => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper color="secondary" style={stylePaper}>
        <Link to={`/portfolio/${portfoUrl(props.title)}`}>
          <div>
            <div className="thumbnail">
              <img
                style={styleImg}
                src={urlMask(props.field_thumbnail)}
                alt={props.title}
              />
            </div>
            <div className="title">
              <Typography color="primary" style={{ margin: '8px 0'}}>
                {props.title}
              </Typography>
            </div>
          </div>
        </Link>
      </Paper>
    </Grid>
  );
};

export default Card;
