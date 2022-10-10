const supertest = require('supertest');
const app = require('./app.js');
const request = supertest(app);
const mongoose = require('mongoose');

beforeAll(() => {
  mongoose.connection.dropDatabase();
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe('User', () => {
  it('Should return 201 status code', async () => {
    const res = await request
      .post('/signup')
      .send({ email: 'valid@email.com', password: 'password' });
    expect(res.status).toBe(201);
    return res;
  });
  it('Should return 200 status code', async () => {
    const res = await request
      .post('/signin')
      .send({ email: 'valid@email.com', password: 'password' });
    expect(res.status).toBe(200);
    return res;
  });
});
