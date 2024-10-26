import express from "express";

import emojis from "./emojis";
import auth from "./auth";
import verifyToken from "../middlewares/authentication";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏"
  });
});

router.use("/emojis", verifyToken, emojis);
router.use("/auth", auth);

export default router;
