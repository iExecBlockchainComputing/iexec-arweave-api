import { Router } from 'express';
import multer from 'multer';
import { uploadController } from './upload.controller.js';

const router = Router();
const upload = multer({
  limits: { fileSize: 100 * 1024 }, // 100 KB
  storage: multer.memoryStorage(),
});

router.post('/', upload.single('file'), uploadController);

export default router;
