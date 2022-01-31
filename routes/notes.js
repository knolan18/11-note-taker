const router = require('express').Router();
const helpers = require('../db/helpers')
const { uuidv4 } = require('uuid');

// GET Route for retrieving all the tips
router.get('/notes', (req, res) => {
  helpers
  .getNotes()
  .then((notes) => res.json(notes))
  .catch((err) => res.status(500).json(err))
});

// POST Route for a new UX/UI tip
router.post('/notes', (req, res) => {
  helpers.addNote(req.body)
  .then((note) => res.json(note))
  .catch((err) => 
  res.status(500).json(err))
});

router.delete('/notes/:id', (req,res) => {
  helpers
  .deleteNote(req.params.id)
  .then(() => res.json({ok: true}))
  .catch((err) => 
  res.status(500).json(err))
})

module.exports = router;