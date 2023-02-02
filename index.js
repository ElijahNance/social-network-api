const express = require('express');
const db = require('./config/connection');
const router = require('./routes');


const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}!`);
  });
});
