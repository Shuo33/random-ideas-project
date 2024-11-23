const express = require('express');
const port = 5001;

const app = express();

app.get('/', (req, res) => {
    res.json({message: 'Welcom to the RandomIdeas API'});
});

// bring 'ideas.js' to this 'server.js' file
const ideasRouter = require('./routes/ideas');

// app.use() helps to add middleware to the app. Here we adding the ideasRouter middleware to the '/api/ideas' route, which means all the routes in the ideasRouter will be prefixed with '/api/ideas' automatically. 
app.use('/api/ideas', ideasRouter);


app.listen(port, ()=> console.log(`Server listening on port ${port}`));