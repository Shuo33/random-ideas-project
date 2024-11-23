const express = require('express');
const router = express.Router(); 

const ideas = [
    {
      id: 1,
      text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
      tag: 'Technology',
      username: 'TonyStark',
      date: '2022-01-02',
    },
    {
      id: 2,
      text: 'Milk cartons that turn a different color the older that your milk is getting',
      tag: 'Inventions',
      username: 'SteveRogers',
      date: '2022-01-02',
    },
    {
      id: 3,
      text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
      tag: 'Software',
      username: 'BruceBanner',
      date: '2022-01-02',
    },
];
  
// Create a route to get all ideas
router.get('/', (req, res) => {
    res.json({ success: true, data: ideas });
});

// Create a route to get a single idea
// specified ':id' in the route, so we can access that route parameter using 'req.params.id'
router.get('/:id', (req, res) => {
    // find() loop through each idea and gives the idea with the id that matches the route parameter
    // '+' turn a string into a number, '+req.params.id' gives the number of the id
    const idea = ideas.find((idea) => idea.id === +req.params.id);
    
    //if idea didnt found, return 404 status code and an error
    if (!idea) {
        return res
            .status(404)
            .json({ success: false, error: 'Resource not found' });
    }

    // if idea found, send back the idea as a successful JSON response
    res.json({ sucess: true, data: idea });
});

module.exports = router; 