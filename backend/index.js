const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoutes = require("./Routes/UserRoutes");
const ExpenseRoutes = require("./Routes/ExpenseRoutes");
const path = require("path");

const filepath = path.join(__dirname, ".", "uploads");
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/simpleform", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error:", err));

app.use("/image", express.static(filepath));
app.use("/api/user", UserRoutes);
app.use("/api/expense", ExpenseRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
