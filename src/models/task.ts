import mongoose from "mongoose";

const defaultNowDate = new Date();
defaultNowDate.setHours(defaultNowDate.getHours() - 3);

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
      default: new Date().setUTCHours(-3, 0, 0, 0),
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

    createdAt: {
      type: Date,
      default: new Date(),
    },

    updatedAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: false,
  }
);

export default mongoose.model("Task", taskSchema);
