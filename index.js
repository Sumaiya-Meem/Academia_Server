const express = require('express')
const cors = require('cors')
const app = express()


require('dotenv').config()
const port = process.env.PORT || 5000
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
    const courseCollection = client.db("AcademiaDB").collection("course");
    const announcementCollection = client.db("AcademiaDB").collection("announcement");
    const instructorCollection = client.db("AcademiaDB").collection("instructor");
    const paymentCollection = client.db("AcademiaDB").collection("payment");
    const cartCollection = client.db("AcademiaDB").collection("carts");

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

//GET course
app.post('/course', async(req, res) => {
    const courses = req.body;
    const result = await courseCollection.insertOne(courses);
    res.send(result)
})
app.get('/course',  async(req, res) => {
    const result = await courseCollection.find().toArray();
    res.send(result)
})
 // load single course
 app.get('/course/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await courseCollection.findOne(query)
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


app.post('/instructor', async(req, res) => {
    const instructor  = req.body;
    const result = await instructorCollection.insertOne(instructor );
    res.send(result)
})

app.get('/instructor',  async(req, res) => {
    const result = await instructorCollection.find().toArray();
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

// POST Announcement
app.post('/announcement', async(req, res) => {
    const announcement = req.body;
    const result = await announcementCollection.insertOne(announcement);
    res.send(result)
})

app.get('/announcement', async(req, res) => {
    const result = await announcementCollection.find().toArray();
    res.send(result)
})


// payment intent
app.post('/create-payment-intent', async (req, res) => {
  let { price } = req.body;
  const amount = parseInt(price * 100); 
  console.log('Server received the amount: ', amount);

  try {
      const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method_types: ['card'],
      });

      res.send({
          clientSecret: paymentIntent.client_secret
      });
  } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).send({ error: error.message });
  }
});

app.post('/payment', async(req, res) => {
  const paymentInfo = req.body;
  console.log(paymentInfo);
  const result = await paymentCollection.insertOne(paymentInfo);
  res.send(result)
});

app.get('/payment/:email', async(req, res) => {
  const email = req.params.email;
  const query = {email: email};
  const result = await paymentCollection.find(query).toArray()    
  res.send(result)
})

// cart 
app.post('/carts',async(req,res)=>{
  const item = req.body;
  const result =await cartCollection.insertOne(item);
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