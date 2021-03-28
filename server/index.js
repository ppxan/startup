const express = require('express');
const app = express();
const port = 80;
const { MongoClient } = require('mongodb');
const url = 'mongodb://root:root@mongo:27017';

(async function () {
  client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  app.get('/form', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
