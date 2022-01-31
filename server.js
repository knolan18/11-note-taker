const express = require('express');
const path = require('path');
const api = require('./routes');
const html = require('./routes/htmlRoutes/htmlRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('public'));

app.use('/api', api);
app.use('/', html)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);