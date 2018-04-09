import React from "react";
import Responsive from 'react-responsive';

export const baseUrl = "https://api.kennyleung.design";

export const urlMask = url => {
  return url.replace("s3-ap-southeast-1.amazonaws.com/", "");
};

export const portfoUrl = url => {
  return url.toLowerCase().replace(/ /g, "-");
};


export const capitalize = function(stringToCap) {
  return stringToCap.charAt(0).toUpperCase() + stringToCap.slice(1);
}

export const SM = props => <Response {...props} maxWidth={959}/>
export const MD = props => <Response {...props} minWidth={960}/>