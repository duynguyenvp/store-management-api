import express from "express";

import category from "./category";
import auth from "./auth";
import verifyToken from "../middlewares/authentication";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏"
  });
});

router.use("/category", verifyToken, category);
router.use("/auth", auth);

export default router;
