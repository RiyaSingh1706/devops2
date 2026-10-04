const request = require('supertest');
const app = require('./app');
test('home page works', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
});