import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";

const router = express.Router();
const userServiceUrl = "http://localhost:3001";

// User Service
router.use(
  "/",
  createProxyMiddleware({
    target: userServiceUrl,
    changeOrigin: true,
    pathRewrite: { "^/users": "/" },
  }),
);

// Auth Service

export default router;
