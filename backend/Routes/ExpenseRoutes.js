const express = require("express");
const router = express.Router();
const {
  createExpense,
  getAllExpense,
  deleteExpense,
  expdown,
  updateExp,
} = require("../controller/ExpenseControl");
const { authmiddeleware } = require("../middleware/authmiddleware");


const { handleUpload } = require("../middleware/uploadMiddleware");

router.post("/create/", authmiddeleware, handleUpload, createExpense);
router.get("/user/:id", getAllExpense);
router.put("/delete/:id", deleteExpense);
router.get("/all/:id", expdown);
router.put("/update/:id", authmiddeleware, handleUpload, updateExp);

module.exports = router;
