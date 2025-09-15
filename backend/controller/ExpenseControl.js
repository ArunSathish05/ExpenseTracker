const { model } = require("mongoose");
const Expense = require("../model/ExpenseModel");

const createExpense = async (req, res) => {
  try {
    if (req.uploadError) {
      return res
        .status(400)
        .json({ success: false, message: req.uploadError.message });
    }

    console.log(req.body)
    console.log(req.file);
    
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, message: "User not found in request" });

    const data = new Expense({
      ...req.body,
      userId: req.user._id,
      imageFile: req.file ? req.file.filename : null,
    });
  
    


    await data.save();

    res.json({ success: true, message: "Saved", data });
  } catch (err) {
    console.error("Create Expense error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllExpense = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const start = (page - 1) * limit;

    const maxCount = await Expense.countDocuments({
      userId: req.params.id,
      isDelete: false,
    });

    const expenses = await Expense.find({
      userId: req.params.id,
      isDelete: false,
    })
      .skip(start)
      .limit(limit);

    res.json({ expenses, maxCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    // console.log("back id:", req);

    const expense = await Expense.findByIdAndUpdate(
      { _id: req.params.id },
      { isDelete: true }
    );
    // console.log(expense);

    res.json(expense);
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const expdown = async (req, res) => {
  try {
    const Allexp = await Expense.find({
      userId: req.params.id,
      isDelete: false,
    });
    // console.log(req.params.id);

    // console.log("Allexp", Allexp);

    res.json(Allexp);
  } catch {}
};

const updateExp = async (req, res) => {
  try {
    if (req.uploadError) {
      return res
        .status(400)
        .json({ success: false, message: req.uploadError.message });
    }

    const { id } = req.params;
    const updateFields = req.body;
    
    console.log("req",req.file);
    console.log("req", req.body);
    
    if (req.file) {
      updateFields.imageFile = req.file.filename;
        
      }

    const expense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.user._id, isDelete: false },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res.json({ success: true, message: "Expense updated", data: expense });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createExpense,
  getAllExpense,
  deleteExpense,
  expdown,
  updateExp,
};
