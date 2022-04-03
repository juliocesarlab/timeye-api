import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },

    sample: {
      type: Number,
      required: false,
    },

    timeSpent: {
      type: Date,
      required: false,
      default: 0,
    },

    productivity: {
      type: Number,
      required: false,
      default: 0,
    },

    ownerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
