
export const baseUrl = "https://35.229.37.11";

export const urlMask = url => {
  return url.replace("s3-ap-southeast-1.amazonaws.com/", "");
};

export const portfoUrl = url => {
  return url.toLowerCase().replace(/ /g, "-");
};