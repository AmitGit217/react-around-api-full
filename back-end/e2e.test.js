const supertest = require('supertest');
const app = require('./app.js');
const request = supertest(app);
const mongoose = require('mongoose');

beforeAll(() => {
  mongoose.connection.dropDatabase();
});

afterAll((done) => {
  mongoose.connection.close();
  mongoose.connection.dropDatabase();
  done();
});

let token;
let id;
describe('User', () => {
  const user = { email: 'valid@email.com', password: 'password' };
  const newUser = { name: 'new', about: 'new' };
  it('Should return 201 status code for /signup', async () => {
    const res = await request.post('/signup').send(user);
    expect(res.status).toBe(201);
    expect(res.body.email).toBe(user.email);
  });
  it('Should return 400 status code for /signup', async () => {
    const res = await request.post('/signup').send(user.password);
    expect(res.status).toBe(400);
  });
  it('Should return 200 status code for /signin', async () => {
    const res = await request.post('/signin').send(user);
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(user.email);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
    id = res.body.user._id;
  });
  it('Should return 200 status code with all the users for /users', async () => {
    const res = await request
      .get('/users')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
  it('Should return 200 status code with user body for /users:_id', async () => {
    const res = await request
      .get(`/users/${id}`)
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe(user.email);
    expect(res.body.name).toBe('Jacques Cousteau');
    expect(res.body.about).toBe('Explorer');
  });
  it('Should return 200 status code with updated user data for /users/me', async () => {
    const res = await request
      .patch('/users/me')
      .set('Authorization', 'Bearer ' + token)
      .send(newUser);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('new');
    expect(res.body.about).toBe('new');
  });
  it('Should return 200 status code with current user by JWT for /users/me', async () => {
    const res = await request
      .get(`/users/me`)
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('new');
    expect(res.body.about).toBe('new');
  });
});