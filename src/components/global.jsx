
export const baseUrl = "https://35.229.37.11";

export const urlMask = url => {
  return url.replace("s3-ap-southeast-1.amazonaws.com/", "");
};

export const portfoUrl = url => {
  return url.toLowerCase().replace(/ /g, "-");
};


export const capitalize = function(stringToCap) {
  return stringToCap.charAt(0).toUpperCase() + stringToCap.slice(1);
}