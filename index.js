const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config;
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello from database");
});
const uri =
  "mongodb+srv://MyProjects:yesicanmakeit40@cluster0.o0xk6.mongodb.net/volunteerdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const activitiesCollection = client
    .db("volunteerdb")
    .collection("activities");
  console.log("mongoDb connected");

  app.post("/addCart", (req, res) => {
    const regData = req.body;
    console.log(regData);
    activitiesCollection.insertOne(regData).then((result) => {
      console.log(result);
      res.send({ registered: true });
    });
  });
  app.post("/add-event", (req, res) => {
    console.log(req.body);
    eventCollection.insertOne(req.body).then((result) => {
      console.log(result);
      res.send({ isImgSubmitted: true });
    });
  });

  app.get("/single-user-registered-event", (req, res) => {
    console.log(req.query);
    activitiesCollection
      .find({ email: req.query.email })
      .toArray((err, documents) => {
        console.log(err, documents);
        res.send(documents);
      });
  });
  app.get("/admin/volunteer-register-list", (req, res) => {
    activitiesCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
  app.delete("/admin-delete-registered-volunteer/:id", (req, res) => {
    console.log(req.params.id);
    activitiesCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => res.send({ deleted: true }));
  });

  app.delete("/event-collection/:id", (req, res) => {
    console.log(req.params.id);
    activitiesCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => res.send({ deleted: true }));
  });
});

app.listen(process.env.PORT || port);
