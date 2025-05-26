import type { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger.js';

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
): void {
  if (typeof err === 'object' && err !== null && 'code' in err) {
    const error = err as { code: string };
    if (error.code === 'LIMIT_FILE_SIZE') {
      logger.warn('A file too large has been rejected');
      res.status(413).json({ message: 'File too large. Max 100KB allowed.' });
      return;
    }
  }
  logger.error(`An unexpected error has occurred err=${err}`);
  res.status(500).json({ message: 'Internal Server Error' });
}
