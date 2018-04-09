import React from "react";
import "../css/icons.css";

const Icon = (props) => {
  let name = props.name
  let size
  let rotate
  let color

  if (props.style === undefined) {
    color = 'inherit'
  } else {
    color = props.style.color
  }

  if (props.size === null) {
    size = '1em'
  } else {
    size = props.size + 'em'
  }

  if (props.rotate === undefined) {
    rotate = false
  } else { rotate = true }

  const style = {
    display: 'inline-block',
    fontSize: size,
    transform: (rotate ? 'rotate(180deg)' : 'none' ),
    color: color
  }

  return (
    <i className={'icon-' + name} style={style}></i>
  )
}


export default Icon;