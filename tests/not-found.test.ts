import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { errorMiddleware } from '../src/middleware/error.js';
import { notFoundMiddleware } from '../src/middleware/not-found.js';

const app = express();
app.use(notFoundMiddleware);
app.use(errorMiddleware);

describe('GET /badroute', () => {
  it('should return a 404 with the lost message', async () => {
    const res = await request(app).get('/badroute');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty(
      'message',
      '🔍 Ooops! Looks like you are lost. 🗺️'
    );
  });
});
