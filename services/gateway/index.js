import express from "express";
import router from "./src/routes/route.js";

const app = express();
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("This is the gateway service");
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
