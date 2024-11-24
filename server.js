const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 5001;

const connectDB = require('./config/db');
connectDB();

const app = express();

// Middleware is those methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method
// Body parser middleware: parsing data in the body

// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object, it allow us to send raw JSON to the server 
app.use(express.json());

//  express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.json({message: 'Welcom to the RandomIdeas API'});
});

// bring 'ideas.js' to this 'server.js' file
const ideasRouter = require('./routes/ideas');

// app.use() helps to add middleware to the app. Here we adding the ideasRouter middleware to the '/api/ideas' route, which means all the routes in the ideasRouter will be prefixed with '/api/ideas' automatically. 
app.use('/api/ideas', ideasRouter);


app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));