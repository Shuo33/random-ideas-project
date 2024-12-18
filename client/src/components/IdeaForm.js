import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaForm {
    constructor() {
      this._formModal = document.querySelector('#form-modal');
      
      // instantiate the IdeaList Class
      this._ideaList = new IdeaList();
    }

    addEventListeners() {
        this._form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
      e.preventDefault();
      
      // validation: if there's no username/text/tag value, then give an alert
      if (
        !this._form.elements.username.value ||
        !this._form.elements.text.value ||
        !this._form.elements.tag.value
      ) {
        alert('Please enter all fields');
        return;
      }

      // save user to local storage
      localStorage.setItem('username', this._form.elements.username.value);


      // get the value of the fields(inputs of DOM)
      const idea = {
          // in the 'Enter a Username' input, we have name="username", so 'elements.username.value' gives the value of this input
          username: this._form.elements.username.value,
          text: this._form.elements.text.value,
          tag: this._form.elements.tag.value,
      }
       
      // console.log(idea);

      // add idea to server
      const newIdea = await IdeasApi.createIdea(idea);

      // add idea to list
      this._ideaList.addIdeaToList(newIdea.data.data);

      // clear fields
      this._form.elements.username.value = '';
      this._form.elements.text.value = '';
      this._form.elements.tag.value = '';
      
      // show the username that stored in the localStorage right away, without reloading the page 
      this.render();

      // close the modal, see Modal.js ligne 17
      document.dispatchEvent(new Event('closemodal'));
    }

    render() {
        this._formModal.innerHTML = `
        <form id="idea-form">

         <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" 
           value= "${localStorage.getItem('username') ? localStorage.getItem('username') : ''}"/>
         </div>

          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>

          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>

          <button class="btn" type="submit" id="submit">Submit</button>
        </form> `;

        this._form = document.querySelector('#idea-form');
        this.addEventListeners();
    }
}

export default IdeaForm; 