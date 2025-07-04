import axios from 'axios';

class Api {
    
    constructor(options) {
        this._baseURL = options.baseUrl;
        this._headers = options.headers;
    }

    getChurch() {
        return axios.get(`${this._baseURL}/church`)
        .then((res) => {
            return res.data;
          })
          .catch((error) => {
            return Promise.reject(`Error: ${error.response ? error.response.status : error.message}`);
          });
    }

    getMembers() {
        return axios.get(`${this._baseURL}/members`)
        .then((res) => {
         return res.data;
        })
        .catch((error) => {
         return Promise.reject(`Error: ${error.response ? error.response.status : error.message}`);
        });
    }

    getAnnounces() {
        return axios.get(`${this._baseURL}/announces`)
        .then((res) => {
         return res.data;
        })
        .catch((error) => {
         return Promise.reject(`Error: ${error.response ? error.response.status : error.message}`);
        });
    }
    

}

const api = new Api({
    baseUrl: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export { api };