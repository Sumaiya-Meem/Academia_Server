// const express = require('express')
// const cors = require('cors')
// const app = express()


// require('dotenv').config()
// const port = process.env.PORT || 5000
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// app.use(cors({
//   origin: [
//     "https://academia-bd85b.web.app",
//     "http://localhost:3000"
//   ],
//   credentials: true
// }));

// app.use(express.json())

// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ojnnavp.mongodb.net/?retryWrites=true&w=majority`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     // await client.connect();
//     // Send a ping to confirm a successful connection
//     // await client.db("admin").command({ ping: 1 });

//      await client.connect(); 

//     const userCollection = client.db("AcademiaDB").collection("users");
//     const technologyCollection = client.db("AcademiaDB").collection("technology");
//     const categoryCollection = client.db("AcademiaDB").collection("category");
//     const courseCollection = client.db("AcademiaDB").collection("course");
//     const announcementCollection = client.db("AcademiaDB").collection("announcement");
//     const instructorCollection = client.db("AcademiaDB").collection("instructor");
//     const paymentCollection = client.db("AcademiaDB").collection("payment");
//     const cartCollection = client.db("AcademiaDB").collection("carts");
//     const saveItemCollection = client.db("AcademiaDB").collection("saveItem");

//     // POST > User
//     app.post('/users',async(req,res)=>{
//         const user = req.body;
//         const result =await userCollection.insertOne(user);
//         res.send(result)
//     })

//     // GET > User
//     app.get('/users',async(req,res)=>{
//         const result =await userCollection.find().toArray();
//         res.send(result);
//     })

//   //   app.get('/users/:id',async(req,res)=>{
//   //     const id = req.params.id;
//   //     const query = { _id: new ObjectId(id) }
//   //     const result =await userCollection.findOne(query);
//   //     res.send(result);
//   // })
    
//    app.get('/users/:email',async(req, res) => {
//     const email = req.params.email;
//     const query = {email: email};
//     const result = await userCollection.findOne(query);
//     res.send(result); 
// })

// //GET course
// app.get('/course', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const size = parseInt(req.query.size) || 10;

//     const result = await courseCollection
//       .find()
//       .skip((page - 1) * size)
//       .limit(size)
//       .toArray();

//     res.send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Failed to fetch courses" });
//   }
// });

// app.post('/course', async(req, res) => {
//     const courses = req.body;
//     const result = await courseCollection.insertOne(courses);
//     res.send(result)
// })
// // app.get('/course',  async(req, res) => {
// //   const page =  parseInt(req.query.page);
// //   const size =  parseInt(req.query.size);
// //   // console.log("page && size: ",page,size);
// //     const result = await courseCollection.find().skip((page-1)*size).limit(size).toArray();
// //     res.send(result)
// // })
// app.get('/courseCount',  async(req, res) => {
//   const count = await courseCollection.estimatedDocumentCount();
//   res.send({count})
// })
//  // load single course
//  app.get('/course/:id', async (req, res) => {
//     const id = req.params.id;
//     const query = { _id: new ObjectId(id) }
//     const result = await courseCollection.findOne(query)
//     res.send(result);
//   })

// //GET technology
// app.post('/technology', async(req, res) => {
//     const technology = req.body;
//     const result = await technologyCollection.insertOne(technology);
//     res.send(result)
// })
// app.get('/technology',  async(req, res) => {
//     const result = await technologyCollection.find().toArray();
//     res.send(result)
// })


// app.post('/instructor', async(req, res) => {
//     const instructor  = req.body;
//     const result = await instructorCollection.insertOne(instructor );
//     res.send(result)
// })

// app.get('/instructor',  async(req, res) => {
//     const result = await instructorCollection.find().toArray();
//     res.send(result)
// })

// app.post('/category', async(req, res) => {
//     const category = req.body;
//     const result = await categoryCollection.insertOne(category);
//     res.send(result)
// })

// app.get('/category',  async(req, res) => {
//     const result = await categoryCollection.find().toArray();
//     res.send(result)
// })

// // POST Announcement
// app.post('/announcement', async(req, res) => {
//     const announcement = req.body;
//     const result = await announcementCollection.insertOne(announcement);
//     res.send(result)
// })

// app.get('/announcement', async(req, res) => {
//     const result = await announcementCollection.find().toArray();
//     res.send(result)
// })


// // payment intent
// app.post('/create-payment-intent', async (req, res) => {
//   let { price } = req.body;
//   const amount = parseInt(price * 100); 
//   console.log('Server received the amount: ', amount);

//   try {
//       const paymentIntent = await stripe.paymentIntents.create({
//           amount: amount,
//           currency: "usd",
//           payment_method_types: ['card'],
//       });

//       res.send({
//           clientSecret: paymentIntent.client_secret
//       });
//   } catch (error) {
//       console.error("Error creating payment intent:", error);
//       res.status(500).send({ error: error.message });
//   }
// });

// app.post('/payment', async(req, res) => {
//   const paymentInfo = req.body;
//   console.log(paymentInfo);
//   const result = await paymentCollection.insertOne(paymentInfo);
//   res.send(result)
// });

// app.get('/payment/:email', async(req, res) => {
//   const email = req.params.email;
//   const query = {email: email};
//   const result = await paymentCollection.find(query).toArray()    
//   res.send(result)
// })
// app.get('/payment', async(req, res) => {
//   const result = await paymentCollection.find().toArray()    
//   res.send(result)
// })

// // cart 
// app.post('/carts',async(req,res)=>{
//   const item = req.body;
//   const result =await cartCollection.insertOne(item);
//   res.send(result)
// })

// app.get('/carts',  async(req, res) => {
//   const result = await cartCollection.find().toArray();
//   res.send(result)
// })

// app.delete('/carts/:id',  async(req, res) => {
//   const id=req.params.id;
//   const query={_id:new ObjectId(id)}
//   const result = await cartCollection.deleteOne(query);
//   res.send(result)
// })

// // saveItem
// app.post('/saveItem',async(req,res)=>{
//   const item = req.body;
//   const result =await saveItemCollection.insertOne(item);
//   res.send(result)
// })

// app.get('/saveItem',  async(req, res) => {
//   const result = await saveItemCollection.find().toArray();
//   res.send(result)
// })
// app.delete('/saveItem/:id',  async(req, res) => {
//   const id=req.params.id;
//   const query={_id:new ObjectId(id)}
//   const result = await saveItemCollection.deleteOne(query);
//   res.send(result)
// })

// app.get('/admin-profile-data', async (req, res) => {
//   // Count total courses
//   const allCourse = await courseCollection.estimatedDocumentCount();

//   // Calculate total payments
//   const totalPayment = await paymentCollection.aggregate([
//     {
//       $addFields: {
//         convertedPrice: { $toDecimal: "$price" } // Convert string price to decimal
//       }
//     },
//     {
//       $group: {
//         _id: null,
//         total: { $sum: "$convertedPrice" } // Sum up all converted prices
//       }
//     }
//   ]).toArray();

//   // calculate the total number of students 
//   const totalEnrollment = await courseCollection.aggregate([
//     {
//       $addFields: {
//         convertedEnrollments: { $toInt: "$totalEnrollStudent" } // Convert the string 'totalEnrollStudent' to integer
//       }
//     },
//     {
//       $group: {
//         _id: null,
//         totalEnrollments: { $sum: "$convertedEnrollments" } // Sum the converted enrollments
//       }
//     }
//   ]).toArray();

//   res.send({
//     allCourse,
//     totalPayments: totalPayment.length > 0 ? totalPayment[0].total : 0,
//     totalStudents: totalEnrollment.length > 0 ? totalEnrollment[0].totalEnrollments : 0
//   });
// });








//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);


// app.get('/', (req, res) => {
//     res.send('Academia Website is running .....')
//   })
  
//   // app.listen(port, () => {
//   //   console.log(`Academia Website  is running on port ${port}`)
//   // })

//   module.exports = app;

// /api/index.js
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// ----------- MongoDB Singleton for Vercel Serverless -----------
let client;
let clientPromise;

if (!process.env.DB_USER || !process.env.DB_PASS) {
  throw new Error("Missing MongoDB environment variables!");
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ojnnavp.mongodb.net/?retryWrites=true&w=majority`;

if (!clientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
}

// ----------------- Express App -----------------
const app = express();

app.use(cors({
  origin: [
    "https://academia-bd85b.web.app",
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());

// -------------- Routes -----------------

app.get('/', async (req, res) => {
  res.send("Academia API is running...");
});

// ---------------- Users ----------------
app.post('/users', async (req, res) => {
  const client = await clientPromise;
  const userCollection = client.db("AcademiaDB").collection("users");
  const user = req.body;
  const result = await userCollection.insertOne(user);
  res.send(result);
});

app.get('/users', async (req, res) => {
  const client = await clientPromise;
  const userCollection = client.db("AcademiaDB").collection("users");
  const result = await userCollection.find().toArray();
  res.send(result);
});

app.get('/users/:email', async (req, res) => {
  const client = await clientPromise;
  const userCollection = client.db("AcademiaDB").collection("users");
  const email = req.params.email;
  const result = await userCollection.findOne({ email });
  res.send(result);
});

// ---------------- Course ----------------
app.post('/course', async (req, res) => {
  const client = await clientPromise;
  const courseCollection = client.db("AcademiaDB").collection("course");
  const course = req.body;
  const result = await courseCollection.insertOne(course);
  res.send(result);
});

app.get('/course', async (req, res) => {
  const client = await clientPromise;
  const courseCollection = client.db("AcademiaDB").collection("course");

  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;

  const result = await courseCollection.find()
    .skip((page - 1) * size)
    .limit(size)
    .toArray();

  res.send(result);
});

app.get('/course/:id', async (req, res) => {
  const client = await clientPromise;
  const courseCollection = client.db("AcademiaDB").collection("course");
  const id = req.params.id;
  const result = await courseCollection.findOne({ _id: new ObjectId(id) });
  res.send(result);
});

app.get('/courseCount', async (req, res) => {
  const client = await clientPromise;
  const courseCollection = client.db("AcademiaDB").collection("course");
  const count = await courseCollection.estimatedDocumentCount();
  res.send({ count });
});

// ---------------- Technology ----------------
app.post('/technology', async (req, res) => {
  const client = await clientPromise;
  const technologyCollection = client.db("AcademiaDB").collection("technology");
  const result = await technologyCollection.insertOne(req.body);
  res.send(result);
});

app.get('/technology', async (req, res) => {
  const client = await clientPromise;
  const technologyCollection = client.db("AcademiaDB").collection("technology");
  const result = await technologyCollection.find().toArray();
  res.send(result);
});

// ---------------- Instructor ----------------
app.post('/instructor', async (req, res) => {
  const client = await clientPromise;
  const instructorCollection = client.db("AcademiaDB").collection("instructor");
  const result = await instructorCollection.insertOne(req.body);
  res.send(result);
});

app.get('/instructor', async (req, res) => {
  const client = await clientPromise;
  const instructorCollection = client.db("AcademiaDB").collection("instructor");
  const result = await instructorCollection.find().toArray();
  res.send(result);
});

// ---------------- Category ----------------
app.post('/category', async (req, res) => {
  const client = await clientPromise;
  const categoryCollection = client.db("AcademiaDB").collection("category");
  const result = await categoryCollection.insertOne(req.body);
  res.send(result);
});

app.get('/category', async (req, res) => {
  const client = await clientPromise;
  const categoryCollection = client.db("AcademiaDB").collection("category");
  const result = await categoryCollection.find().toArray();
  res.send(result);
});

// ---------------- Announcement ----------------
app.post('/announcement', async (req, res) => {
  const client = await clientPromise;
  const announcementCollection = client.db("AcademiaDB").collection("announcement");
  const result = await announcementCollection.insertOne(req.body);
  res.send(result);
});

app.get('/announcement', async (req, res) => {
  const client = await clientPromise;
  const announcementCollection = client.db("AcademiaDB").collection("announcement");
  const result = await announcementCollection.find().toArray();
  res.send(result);
});

// ---------------- Payment ----------------
app.post('/create-payment-intent', async (req, res) => {
  const { price } = req.body;
  const amount = parseInt(price * 100);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ['card'],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

app.post('/payment', async (req, res) => {
  const client = await clientPromise;
  const paymentCollection = client.db("AcademiaDB").collection("payment");
  const result = await paymentCollection.insertOne(req.body);
  res.send(result);
});

app.get('/payment/:email', async (req, res) => {
  const client = await clientPromise;
  const paymentCollection = client.db("AcademiaDB").collection("payment");
  const result = await paymentCollection.find({ email: req.params.email }).toArray();
  res.send(result);
});

app.get('/payment', async (req, res) => {
  const client = await clientPromise;
  const paymentCollection = client.db("AcademiaDB").collection("payment");
  const result = await paymentCollection.find().toArray();
  res.send(result);
});

// ---------------- Cart ----------------
app.post('/carts', async (req, res) => {
  const client = await clientPromise;
  const cartCollection = client.db("AcademiaDB").collection("carts");
  const result = await cartCollection.insertOne(req.body);
  res.send(result);
});

app.get('/carts', async (req, res) => {
  const client = await clientPromise;
  const cartCollection = client.db("AcademiaDB").collection("carts");
  const result = await cartCollection.find().toArray();
  res.send(result);
});

app.delete('/carts/:id', async (req, res) => {
  const client = await clientPromise;
  const cartCollection = client.db("AcademiaDB").collection("carts");
  const result = await cartCollection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.send(result);
});

// ---------------- SaveItem ----------------
app.post('/saveItem', async (req, res) => {
  const client = await clientPromise;
  const saveItemCollection = client.db("AcademiaDB").collection("saveItem");
  const result = await saveItemCollection.insertOne(req.body);
  res.send(result);
});

app.get('/saveItem', async (req, res) => {
  const client = await clientPromise;
  const saveItemCollection = client.db("AcademiaDB").collection("saveItem");
  const result = await saveItemCollection.find().toArray();
  res.send(result);
});

app.delete('/saveItem/:id', async (req, res) => {
  const client = await clientPromise;
  const saveItemCollection = client.db("AcademiaDB").collection("saveItem");
  const result = await saveItemCollection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.send(result);
});

// ---------------- Admin Profile Data ----------------
app.get('/admin-profile-data', async (req, res) => {
  const client = await clientPromise;
  const courseCollection = client.db("AcademiaDB").collection("course");
  const paymentCollection = client.db("AcademiaDB").collection("payment");

  const allCourse = await courseCollection.estimatedDocumentCount();

  const totalPaymentAgg = await paymentCollection.aggregate([
    { $addFields: { convertedPrice: { $toDecimal: "$price" } } },
    { $group: { _id: null, total: { $sum: "$convertedPrice" } } }
  ]).toArray();

  const totalPayments = totalPaymentAgg.length > 0 ? totalPaymentAgg[0].total : 0;

  // calculate total students
  const totalEnrollmentAgg = await courseCollection.aggregate([
    { $addFields: { convertedEnrollments: { $toInt: "$totalEnrollStudent" } } },
    { $group: { _id: null, totalEnrollments: { $sum: "$convertedEnrollments" } } }
  ]).toArray();

  const totalStudents = totalEnrollmentAgg.length > 0 ? totalEnrollmentAgg[0].totalEnrollments : 0;

  res.send({ allCourse, totalPayments, totalStudents });
});

// ---------------- Export Serverless Handler ----------------
module.exports.handler = serverless(app);
