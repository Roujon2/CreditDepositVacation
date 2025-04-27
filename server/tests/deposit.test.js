import request from 'supertest';
import app from '../app.js';
import { describe, it, expect } from 'vitest';


describe('POST /api/v1/deposit', () => {
  it('should create a new deposit with valid data', async () => {
    const res = await request(app)
      .post('/api/v1/deposit')
      .send({
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        checkInDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
        checkOutDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        securityDeposit: 100,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toHaveProperty('deposit_id');
  });

  it('should return an error if check-out is before check-in', async () => {
    const res = await request(app)
      .post('/api/v1/deposit')
      .send({
        guestName: 'Jane Smith',
        guestEmail: 'jane@example.com',
        checkInDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
        checkOutDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        securityDeposit: 150,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toContain('Check-out date must be after check-in date');
  });

  it('should return an error if check-in date is in the past', async () => {
    const res = await request(app)
      .post('/api/v1/deposit')
      .send({
        guestName: 'Alice Johnson',
        guestEmail: 'alice@example.com',
        checkInDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days in the past
        checkOutDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
        securityDeposit: 200,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toContain('Check-in date must be today or in the future');
  });

  it('should return an error if check-in date is less than 3 days from today', async () => {
    const res = await request(app)
      .post('/api/v1/deposit')
      .send({
        guestName: 'Bob Brown',
        guestEmail: 'bob@example.com',
        checkInDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
        checkOutDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
        securityDeposit: 250,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toContain('Check-in date must be at least 3 days from today');
  });
});
