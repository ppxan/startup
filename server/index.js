const express = require('express');
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');
const url = 'mongodb://root:root@mongo:27017';

(async function () {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db('startup');

  app.get('/form', async (req, res) => {
    const result = await db.collection('form').find({ _id: req.params.id }).toArray();
    res.send(result);
  });
  app.post('/form', async (req, res) => {
    res.send('post form' + req.body);
    const result = await db.collection('form').insertOne(req.body);
    res.json(result);
  });

  app.post('/submit_form', (req, res) => {
    res.send('Hello World!');
  });
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
