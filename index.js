const express = require('express');
const cors = require('cors')
// const jwt = require('jsonwebtoken')
require('dotenv').config();

app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())


// mongoDB Setup

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.udflnrf.mongodb.net/?retryWrites=true&w=majority`;

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
    
    const userCollection = client.db("TaskManager").collection("users")

    app.post('/users', async(req, res) =>{
      const user = req.body;
      const query = { email: user.email } 
      const isExist = await userCollection.findOne(query)
      if(isExist){
        return res.send({massage: 'user is already exist'})
      }
      const result = await userCollection.insertOne(user)
      res.send(result)
    })




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Task manager server is running !!!')
})

app.all('*', (req, res, next) => {
    const error = new Error(`the requested url is invalid : [${req.url}]`)
    error.status = 404;
    next(error)
})


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({

        massage: `the requested url is invalid : [${req.url}]`,
        status: err.status

    })
})



app.listen(port, () => {
    console.log(`Task manager server is running on port : ${port}`)
})
