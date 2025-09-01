import request from 'supertest';
import app from '../src/server';

describe('Image API', () => {
  it('should return 200 for valid image request', async () => {
    const response = await request(app)
      .get('/api/images?filename=fjord.jpg&width=200&height=200')
      .expect(200);

    expect(response.headers['content-type']).toMatch(/image\/jpeg/);
  });

  it('should return 400 for missing filename', async () => {
    const response = await request(app)
      .get('/api/images?width=200&height=200')
      .expect(400);

    expect(response.body.error).toContain('Missing required parameters');
  });

  it('should return 400 for missing width', async () => {
    const response = await request(app)
      .get('/api/images?filename=fjord.jpg&height=200')
      .expect(400);

    expect(response.body.error).toContain('Missing required parameters');
  });

  it('should return 400 for missing height', async () => {
    const response = await request(app)
      .get('/api/images?filename=fjord.jpg&width=200')
      .expect(400);

    expect(response.body.error).toContain('Missing required parameters');
  });

  it('should return 400 for invalid width', async () => {
    const response = await request(app)
      .get('/api/images?filename=fjord.jpg&width=abc&height=200')
      .expect(400);

    expect(response.body.error).toContain('Width and height must be positive numbers');
  });

  it('should return 400 for invalid height', async () => {
    const response = await request(app)
      .get('/api/images?filename=fjord.jpg&width=200&height=abc')
      .expect(400);

    expect(response.body.error).toContain('Width and height must be positive numbers');
  });

  it('should return 400 for negative width', async () => {
    const response = await request(app)
      .get('/api/images?filename=fjord.jpg&width=-100&height=200')
      .expect(400);

    expect(response.body.error).toContain('Width and height must be positive numbers');
  });

  it('should return 400 for zero height', async () => {
    const response = await request(app)
      .get('/api/images?filename=fjord.jpg&width=200&height=0')
      .expect(400);

    expect(response.body.error).toContain('Width and height must be positive numbers');
  });

  it('should return 500 for non-existent image', async () => {
    const response = await request(app)
      .get('/api/images?filename=nonexistent.jpg&width=200&height=200')
      .expect(500);

    expect(response.body.error).toContain('Internal server error');
  });
});
