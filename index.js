const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors())
app.use(express.json())


// MongoDB

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g2lboph.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,

    deprecationErrors: true,
  }
});

async function run() {
  try {
     // Collections
     const clientsCollection = client.db('personalDB').collection('clients');
     const projectsCollections = client.db('personalDB').collection('projects');

    //  Projects related API
// Fetch client by ID
app.get('/clients/:id', async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await clientsCollection.findOne({ _id: new ObjectId(clientId) });

    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 
// Get all clients
app.get('/clients', async (req, res) => {
  try {
    const clients = await clientsCollection.find().toArray();
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
    // client submit
     app.post('/clients', async (req, res) => {
  const newClient = req.body;
  const insertResult = await clientsCollection.insertOne(newClient);
  res.send(insertResult);
});

      // project submit 
      app.post('/projects', async (req, res) => {
        const result = await projectsCollections.find().toArray();
        res.send(result);
      });
      
      // projects url
      app.get('/projects', async(req, res)=>{
        const result = await projectsCollections.find().toArray();
        res.send(result)
      })
      
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })