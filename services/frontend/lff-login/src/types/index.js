const REACT_BACKEND_URL =
  process.env.NODE_ENV == "development"
    ? "https://localhost:5001/api/v1.0/"
    : "/api/v1.0/";
const BACKEND_URL_DEVELOPMENT = REACT_BACKEND_URL;
export { BACKEND_URL_DEVELOPMENT };
