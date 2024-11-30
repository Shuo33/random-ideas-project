import axios from 'axios';

class IdeasApi {
    constructor() {
        this._apiUrl = 'http://localhost:5001/api/ideas';
    }

    getIdeas() {
        // returns a promise
        return axios.get(this._apiUrl);
    }
}

// export and instantiate the IdeaApi class
export default new IdeasApi();

