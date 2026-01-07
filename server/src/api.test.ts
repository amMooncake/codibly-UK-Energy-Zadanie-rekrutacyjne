import { describe, it, expect} from 'vitest';
import request from 'supertest';
import app from './index.js';


describe('GET /api/generationmix', () => {
  it('responds with 200 status and JSON data', async () => {

    const response = await request(app).get('/api/generationmix');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('generationmix');
  });
});