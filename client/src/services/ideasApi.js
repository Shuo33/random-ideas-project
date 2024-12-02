import axios from 'axios';

class IdeasApi {
    constructor() {
        this._apiUrl = 'http://localhost:5001/api/ideas';
    }


    // get idea from the server
    getIdeas() {
        // returns a promise
        return axios.get(this._apiUrl);
    }



    // create idea on the server
    createIdea(data) {
        return axios.post(this._apiUrl, data);
    }



    // update idea on the server
    updateIdea(id, data) {
        return axios.put(`${this._apiUrl}/${id}`, data); 
    }



    // delete on the server: only the user who match the username can delete the idea
    deleteIdea(id) {
        // check if there's a username stored in the storage, then put it into the username variable, or, username = ''
        const username = localStorage.getItem('username') ? localStorage.getItem('username') : ''; 

        return axios.delete(`${this._apiUrl}/${id}`, {
            // set data to un object that just has the username, so the other info like text, tag, id will be deleted
            data: {
                // username: username,
                username
            }
        })
        
    }
}

// export and instantiate the IdeaApi class
export default new IdeasApi();

