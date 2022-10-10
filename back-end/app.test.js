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
  const user = { email: 'valid@email.com', password: 'password' };
  it('Should return 201 status code for /signup', async () => {
    const res = await request.post('/signup').send(user);
    expect(res.status).toBe(201);
    expect(res.body.email).toBe(user.email);
    return res;
  });
  it('Should return 200 status code for /signin', async () => {
    const res = await request.post('/signin').send(user);
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(user.email);
    expect(res.body.token).toBeDefined();
    return res;
  });
});
