const express = require('express');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 80;
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://root:root@mongo:27017';

(async function () {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db('startup');

  app.get('/form/:id', async (req, res) => {
    console.log('get form' + JSON.stringify(req.params));
    const result = await db
      .collection('form')
      .find({ _id: new ObjectId(req.params.id) })
      .toArray();
    console.log('get form' + JSON.stringify(req.params));
    res.send(result);
  });
  app.post('/form', async (req, res) => {
    console.log('post form' + req.body);
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
