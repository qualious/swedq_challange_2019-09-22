/* eslint-disable no-console */
// Define fetch for testing
if (!window.fetch) {
  // eslint-disable-next-line global-require
  window.fetch = require("node-fetch");
}

const baseUrl = `http://${
  process.env.NODE_ENV === "production" ? "SERVER_IP" : "localhost"
}:3000/api/`;

export async function request(method, path, body = null) {
  return new Promise((res, rej) => {
    if (method === "GET" && body !== null) {
      console.log(
        `%c You can't set payload with GET request. Check ${path} request.`,
        `font-size: 25px`,
      );
      return null;
    }
    const url = baseUrl + path;
    const requestParams = {
      method,
      headers: {
        Accept: "*/*",
      },
      body: undefined,
    };

    if (body) {
      requestParams.body = JSON.stringify(body);
    }

    fetch(url, requestParams)
      .then(response => (response.status < 300 ? res(response) : rej(response)))
      .catch(err => {
        console.log("err", err);
      });

    return null;
  });
}

export default request;
