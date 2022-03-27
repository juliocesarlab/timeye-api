import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  sample: {
    type: Number,
    required: false
  },

  hoursSpent: {
    type: Number,
    default: 0
  },

  productivity: {
    type: Number,
    default: 0
  },

  ownerId: {
    type: String,
    unique: true,
    required: true
  }
},
{
  timestamps: true
})

export default mongoose.model('Task', taskSchema);