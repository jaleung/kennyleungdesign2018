import React from "react";
import Icon from "./icon"
import PropTypes from "prop-types";
import Button from "material-ui/Button"

const style = {
  width: '100%',
  position: 'absolute',
  left: 0,
  bottom: 0,
  textAlign: 'center'
}

const Scroller = (props) => {
  return <div style={style}>
      <Button fullWidth href={"#" + props.to} size="large" className="padding-bottom padding-top">
        <Icon name="down-open" size="1.3" />
      </Button>
    </div>;
}

Scroller.propTypes = {
  to: PropTypes.string.isRequired
}

export default Scroller;