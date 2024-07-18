import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";

const router = express.Router();

const userServiceUrl = "http://localhost:3002";
const authServiceUrl = "http://localhost:3001";

// User Service
router.use(
  "/users",
  createProxyMiddleware({
    target: userServiceUrl,
    changeOrigin: true,
    pathRewrite: { "^/users": "/" },
  }),
);

// Auth Service
router.use(
    "/auth",
    createProxyMiddleware({
      target: authServiceUrl,
      changeOrigin: true,
      pathRewrite: { "^/auth": "/" },
    }),
);
  

export default router;
