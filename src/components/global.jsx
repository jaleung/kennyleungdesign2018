
export const baseUrl = "https://35.189.186.209";

export const urlMask = url => {
  return url.replace("storage.googleapis.com/", "");
};

export const portfoUrl = url => {
  return url.toLowerCase().replace(/ /g, "-");
};