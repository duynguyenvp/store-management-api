import express from 'express';
import verifyToken from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  res.success(['😀', '😳', '🙄']);
});

export default router;
