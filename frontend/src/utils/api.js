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

    updateChurch({ churchName, logo, image, pastor }) {
       const updatedFields = {};

       if (churchName !== undefined) updatedFields.churchName = churchName;
       if (logo !== undefined) updatedFields.logo = logo;
       if (image !== undefined) updatedFields.image = image;
       if (pastor !== undefined) updatedFields.pastor = pastor
    
      return axios.patch(`${this._baseURL}/church`, updatedFields, { headers: this._headers })
        .then((res) => res.data)
        .catch((error) => {
          const errorMessage = error.response 
            ? `Error: ${error.response.status} - ${error.response.data.message || error.message}` 
            : `Network error: ${error.message}`;
          return Promise.reject(errorMessage);
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