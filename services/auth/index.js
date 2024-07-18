import express from "express";
import router from "./src/routes/auth.route.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json());

app.use("/", router);

app.get("/", (req, res) => {
  res.send("This is the auth service");
});

app.listen(3001, () => {
  console.log(`Server running on port 3001`);
});
