require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8003;
require("./db/conn");
const crud = require("./models/crudSchema");
const cors = require("cors");
const router = require("./routes/router");

app.use(cors({
    origin: 'https://buddybookz.netlify.app',
    methods: ["GET", "PATCH", "POST", "DELETE"],
    credentials: true,
}));
app.use(express.json());

app.use(router);

//get api
app.get("/", (req, res) => {
  res.status(200).json("server started...");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
