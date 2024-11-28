const express = require('express');
const router = express.Router(); 
const Idea = require('../models/Idea');


// Create a route to get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' })
  } 
});



// Create a route to get a single idea
// specified ':id' in the route, so we can access that route parameter using 'req.params.id'
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id); 
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, error: 'Something went wrong'})
  }
});




// Add an idea
router.post('/', async (req, res) => {
  //create an instance of Idea 
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ sucess: true, data: savedIdea }); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});



//update idea
router.put('/:id', async (req, res) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      // the id  
      req.params.id,
      { // updated text and tag by using $set
        $set: {
        text: req.body.text,
        tag: req.body.tag
         }
      },
      // if the id (req.params.id) didnt exist, a new id will be created
      { new: true}, 
    );
    res.json({ success: true, data: updatedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
});



// delete idea
router.delete('/:id', async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});


module.exports = router; 