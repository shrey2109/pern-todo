const express = require("express");
const cors = require("cors");
const todoRouter = require("./todoRouter");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/todos", todoRouter);

app.use("/", (req, res) => {
  res.json("ERROR : 404");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING ON PORT NUMBER : " + PORT);
});
