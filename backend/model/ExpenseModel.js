const mongoose =require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  date: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  },
  isDelete:{type:Boolean,default:false},
  imageFile:String
});

module.exports = mongoose.model("Expense",ExpenseSchema)