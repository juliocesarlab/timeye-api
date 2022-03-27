import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    password: {
      type: String,
      required: true,
    },
    dayTimeSum: {
      type: Number,
      default: 0
    },
    weekTimeSum: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('User', userSchema);