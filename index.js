const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://cllickdown.web.app"],
    credentials: true,
  })
);
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://shafayetahmad1:tVyfzi4VnbaBTmEo@cluster0.433dtyr.mongodb.net/?retryWrites=true&w=majority";

// const uri = "mongodb://localhost:27017";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const tasksDB = client.db("tasksDB");

    const tasksCollection = tasksDB.collection("tasks");

    app.get("/gethello5", (req, res) => {
      res.send("hello");
    });

    app.post("/addTask", async (req, res) => {
      const task = req.body;
      const result = await tasksCollection.insertOne(task);
      console.log(result);
      res.send(result);
    });
    app.get("/getTasks", async (req, res) => {
      const status = req.query.status;
      const result = await tasksCollection.find({ status: status }).toArray();
      res.send(result);
    });

    app.post("/moveTask", async (req, res) => {
      const data = req.body;
      const draggedFrom = data.droppedTask.status;
      const droppedIn = data.dropTarget;
      const taskId = data.droppedTask._id;
      console.log(draggedFrom, droppedIn, taskId);
      const result = await tasksCollection.updateOne(
        { _id: new ObjectId(taskId) },
        { $set: { status: droppedIn } }
      );
      console.log(result);
      res.send(result);
    });

    app.get("/getAllTasks", async (req, res) => {
      const result = await tasksCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/gethello99", (req, res) => {
      res.send("hello from inside");
    });

    app.delete("/deleteTask", async (req, res) => {
      const id = req.query.id;
      console.log(id);
      const result = await tasksCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/gethello2", (req, res) => {
  res.send("2 hello");
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
