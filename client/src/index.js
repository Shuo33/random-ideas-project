// CommonJS modules with webpack.config.js 
import './css/style.css';

// import CSS fontawesome
import '@fortawesome/fontawesome-free/css/all.css';


// import Modal
import Modal from './components/Modal';
// instantiate the Modal
const modal = new Modal();


//import IdeaForm
import IdeaForm from './components/IdeaForm';
//instantiate the IdeaForm
const ideaForm = new IdeaForm();
ideaForm.render();


//import IdeaList
import IdeaList from './components/IdeaList';
//instantiate the IdeaList
const ideaList = new IdeaList();
ideaList.render();