import GLOBAL from "../GLOBAL";

class MainModel {
  paramsEndpointFetch = (endpoint, data) => {
    const url = new URL(endpoint);
    url.search = new URLSearchParams(JSON.parse(data.body)).toString();
    return fetch(url, {
      method: data.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => ({ require: false, data: [], error }));
  };
}

export class BaseFetch extends MainModel {
  paramsFetch = (data) => this.paramsEndpointFetch(`${GLOBAL.BASE_SERVER.URL}${data.url}`, data);
}
