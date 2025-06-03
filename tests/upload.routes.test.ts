import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { errorMiddleware } from '../src/middleware/error.js';
import uploadRoutes from '../src/upload/upload.routes.js';

const app = express();
app.use('/upload', uploadRoutes);
app.use(errorMiddleware);

describe('POST /upload', () => {
  it('should successfully upload a file smaller than 100KB', async () => {
    const smallBuffer = Buffer.from('Hello Arweave!');

    const res = await request(app)
      .post('/upload')
      .attach('file', smallBuffer, 'hello.txt');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('arweaveId');
  });

  it('should reject a file larger than 100KB', async () => {
    const largeBuffer = Buffer.alloc(101 * 1024, 'a'); // 101KB

    const res = await request(app)
      .post('/upload')
      .attach('file', largeBuffer, 'large.txt');

    expect(res.status).toBe(413);
    expect(res.body).toHaveProperty('message');
  });
});
