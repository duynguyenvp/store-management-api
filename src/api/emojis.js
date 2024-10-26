import express from 'express';
import { checkPermission } from '../middlewares/permission';

const router = express.Router();

router.get('/', checkPermission("read_record"), (req, res) => {
  res.success(['😀', '😳', '🙄']);
});

export default router;
