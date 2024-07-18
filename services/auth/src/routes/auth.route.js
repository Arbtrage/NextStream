import express from "express";
import { login, register } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const response = await login({ email, password });
  return res.json(response);
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const response = await register({ email, password });
  return res.json(response);
});

export default router;
