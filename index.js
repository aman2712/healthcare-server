import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Data from "./models/dataModel.js";

dotenv.config();

const app = express();
app.use(express.json());

// get all data
app.get("/", async (req, res) => {
  const data = await Data.find({}).sort({
    createdAt: "desc",
  });

  res.json(data);
});

// get most recent record
app.get("/latest", async (req, res) => {
  const data = await Data.find({})
    .sort({
      createdAt: "desc",
    })
    .limit(1);

  res.json(data);
});

// insert a record
app.post("/", async (req, res) => {
  const { temperature, heartrate } = req.body;
  const data = new Data({
    temperature,
    heartrate,
  });

  try {
    const createdRecord = await data.save();
    res.status(201).json(createdRecord);
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server up and running");
  });
});
