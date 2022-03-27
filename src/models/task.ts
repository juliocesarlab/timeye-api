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

  timeSpent: {
    type: Number,
    default: 0
  },

  productivity: {
    type: Number,
    default: 0
  }
},
{
  timestamps: true
})

export default mongoose.model('Task', taskSchema);