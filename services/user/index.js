// a basic express app

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("This is the user service");
});

app.listen(3001, () => {
  console.log(`Server running on port 3001`);
});
