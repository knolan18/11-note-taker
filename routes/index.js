const router = require('express').Router();

const notesRouter = require('../routes/notes');

router.use(notesRouter)

module.exports = router;