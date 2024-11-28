class Modal {
    constructor() {
        this._modal = document.querySelector('#modal');
        this._modalBtn = document.querySelector('#modal-btn');

        // call the addEventListner here since the constructor runs right away as soon as the page load
        this.addEventListeners();
    }

    // without 'bind(this)', the 'this' in 'this.open' refer to the element that fire the event, which is the modalBtn, since it's in a addEventListner
    // with 'bind(this)', the 'this' in the 'this.open' refer to the open() method of the Modal class
    addEventListeners() {
        this._modalBtn.addEventListener('click', this.open.bind(this));
        window.addEventListener('click', this.outSideClick.bind(this));

        // the '()=>this.close()' is the same as 'this.close.bind(this)' 
        document.addEventListener('closemodal', () => this.close())
    }

    open() {
        this._modal.style.display = 'block';
    }
    
    close() {
        this._modal.style.display = 'none';
    }
    
    outSideClick(e) {
        if (e.target === this._modal) {
            this.close();
        }
    }
}

export default Modal;