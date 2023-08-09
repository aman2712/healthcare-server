import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    temperature: {
      type: Number,
      required: true,
    },
    heartrate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Data = new mongoose.model("Data", dataSchema);

export default Data;
