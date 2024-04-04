const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ojnnavp.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    const userCollection = client.db("AcademiaDB").collection("users");
    const technologyCollection = client.db("AcademiaDB").collection("technology");
    const categoryCollection = client.db("AcademiaDB").collection("category");

    // POST > User
    app.post('/users',async(req,res)=>{
        const user = req.body;
        const result =await userCollection.insertOne(user);
        res.send(result)
    })

    // GET > User
    app.get('/users',async(req,res)=>{
        const result =await userCollection.find().toArray();
        res.send(result);
    })

    
   app.get('/users/:email',async(req, res) => {
    const email = req.params.email;
    const query = {email: email};
    const result = await userCollection.findOne(query);
    res.send(result); 
})


//GET technology
app.post('/technology', async(req, res) => {
    const technology = req.body;
    const result = await technologyCollection.insertOne(technology);
    res.send(result)
})
app.get('/technology',  async(req, res) => {
    const result = await technologyCollection.find().toArray();
    res.send(result)
})

app.post('/category', async(req, res) => {
    const category = req.body;
    const result = await categoryCollection.insertOne(category);
    res.send(result)
})

app.get('/category',  async(req, res) => {
    const result = await categoryCollection.find().toArray();
    res.send(result)
})




    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Academia Website is running .....')
  })
  
  app.listen(port, () => {
    console.log(`Academia Website  is running on port ${port}`)
  })