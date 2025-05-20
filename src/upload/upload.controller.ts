import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger.js';
import { handleFileUpload } from './upload.service.js';
export const uploadController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file?.buffer) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const fileId = await handleFileUpload(req.file.buffer);
    logger.info(`A new file has been added fileId=${fileId}`)
    res
      .status(200)
      .json({ arweaveId: fileId, url: `https://arweave.net/${fileId}` });
  } catch (error: unknown) {
    next(error);
  }
};
