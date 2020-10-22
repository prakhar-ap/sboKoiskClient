const local = {
    apiUrl: 'http://localhost:3000'
};

const dev =  {
    apiUrl: ''
};

const config = process.env.REACT_APP_ENV.trim() === "local"
    ? local
    : dev;

export default config;
