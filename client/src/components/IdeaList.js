import IdeasApi from '../services/ideasApi';

class IdeaList {
    constructor() {
        this._ideaListEl = document.querySelector('#idea-list');
        this._ideas = []; 

        this.getIdeas();

        this._validTags = new Set();
        this._validTags.add('technology');
        this._validTags.add('software');
        this._validTags.add('business');
        this._validTags.add('education');
        this._validTags.add('health');
        this._validTags.add('inventions');
    }

    async getIdeas() {
        try {
            const res = await IdeasApi.getIdeas();
            // first data refer to the info of the promise of 'IdeaApi.getIdeas()', seconde data is the idea we want, see backend file 'idea.js' line 10
            this._ideas = res.data.data;
            // console.log(this._ideas);
            this.render();
        } catch (error) {
            console.log(error);
        }
    }

    addIdeaToList(idea) {
        this._ideas.push(idea);
        this.render();
    }

    getTagClass(tag) {
        tag = tag.toLowerCase();
        let tagClass = '';
        if (this._validTags.has(tag)) {
            tagClass = `tag-${tag}`;
        } else {
            //when there's no tag, it's black color
            tagClass = '';
        }
        return tagClass;
    }

    // click the delete button to delete the idea
    addEventListeners() {
        this._ideaListEl.addEventListener('click', (e) => {
            // if the clicked element is the delete button
            if (e.target.classList.contains('fa-times')) {
                // stop the event from bubbing up to it's parent element
                e.stopImmediatePropagation();

                //get the idea's id number: use dataset wherever there's a data attribute and get the attribut's value with it's name
                const ideaId = e.target.parentElement.parentElement.dataset.id;
                this.deleteIdea(ideaId);
            }  
        });
    }

    async deleteIdea(ideaId) {
        try {
            // delete the idea from the server 
            const res = await IdeasApi.deleteIdea(ideaId);

            // delete the idea from the DOM: keep those that has not the ideaId
            this._ideas.filter((idea) => idea.id !== ideaId); 
            // render the filtered ones to the DOM 
            this.getIdeas();

        } catch (error) {
            alert('You can not delete this resource'); 
        }
    }

    render() {
        this._ideaListEl.innerHTML = this._ideas.map((idea) => {
            const tagClass = this.getTagClass(idea.tag);
            
            // show the delete button only if the idea has the same username as the one that stored in the storage, which means you can only delete your idea but not the other's idea
            const deleteBtn = idea.username === localStorage.getItem('username') ? `<button class="delete"><i class="fas fa-times"></i></button>` : '';

            // add data-id into the div, with the id number given by idea._id 
            return `
            <div class="card" data-id="${idea._id} ">
                 ${deleteBtn}
                 <h3>
                 ${idea.text}
                 </h3>
                 <p class="tag ${tagClass}">${idea.tag.toUpperCase()} </p>
                 <p>
                 Posted on <span class="date">${idea.date}</span> by <span class="author">${idea.username} </span>
                 </p>
            </div> `;
        }).join('');  

        // we want it to run after the HTML renders: the element get affiched on the screen
        this.addEventListeners();
    }
}

export default IdeaList; 