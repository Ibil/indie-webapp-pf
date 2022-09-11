const WEB_API_LOCALHOST = `http://localhost:8080/v1/`;
const WEB_API_REMOTEHOST = `https://api-store-indielisboa.herokuapp.com/v1/`;

const INDIE_WEBAPI_URL = process.env.INDIE_WEBAPI_URL ?? WEB_API_REMOTEHOST;

export const WEB_API_HOST = INDIE_WEBAPI_URL;