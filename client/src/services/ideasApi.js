import axios from 'axios';

class IdeasApi {
    constructor() {
        this._apiUrl = 'http://localhost:5001/api/ideas';
    }

    getIdeas() {
        // returns a promise
        return axios.get(this._apiUrl);
    }

    // send the data/idea of the form to the server, and get a feedback which is a promise
    createIdea(data) {
        return axios.post(this._apiUrl, data);
    }
}

// export and instantiate the IdeaApi class
export default new IdeasApi();

