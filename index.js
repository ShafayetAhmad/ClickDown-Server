const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/gethello2", (req, res) => {
  res.send("2 hello");
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
