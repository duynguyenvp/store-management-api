import express from "express";

import emojis from "./emojis";
import auth from "./auth";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏"
  });
});

router.use("/emojis", emojis);
router.use("/auth", auth);

export default router;
