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

    expect(response.body.error).toContain('Width must be a positive integer');
  });

  it('should return 400 for invalid height', async () => {
    const response = await request(app)
      .get('/api/images?filename=fjord.jpg&width=200&height=abc')
      .expect(400);

    expect(response.body.error).toContain('Height must be a positive integer');
  });

  it('should return 400 for negative width', async () => {
    const response = await request(app)
      .get('/api/images?filename=fjord.jpg&width=-100&height=200')
      .expect(400);

    expect(response.body.error).toContain('Width must be a positive integer');
  });

  it('should return 400 for zero height', async () => {
    const response = await request(app)
      .get('/api/images?filename=fjord.jpg&width=200&height=0')
      .expect(400);

    expect(response.body.error).toContain('Height must be between 1 and 10000');
  });

  it('should return 400 for invalid filename', async () => {
    const response = await request(app)
      .get('/api/images?filename=nonexistent.jpg&width=200&height=200')
      .expect(400);

    expect(response.body.error).toContain('Invalid filename');
  });

  it('should return 400 for malformed width', async () => {
    const response = await request(app)
      .get('/api/images?filename=fjord.jpg&width=500f&height=200')
      .expect(400);

    expect(response.body.error).toContain('Width must be a positive integer');
  });

  it('should return 400 for width too large', async () => {
    const response = await request(app)
      .get('/api/images?filename=fjord.jpg&width=15000&height=200')
      .expect(400);

    expect(response.body.error).toContain('Width must be between 1 and 10000');
  });

  it('should return 400 for empty filename', async () => {
    const response = await request(app)
      .get('/api/images?filename=&width=200&height=200')
      .expect(400);

    expect(response.body.error).toContain('Filename must be a non-empty string');
  });
});
