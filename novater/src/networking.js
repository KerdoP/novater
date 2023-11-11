export const EXPRESS_URL = "http://192.168.137.1:3307";

export const fetcher = (url) => fetch(EXPRESS_URL+url).then((res) => res.json());
