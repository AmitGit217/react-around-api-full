const supertest = require('supertest');
const app = require('./app.js');
const request = supertest(app);
const mongoose = require('mongoose');

afterAll((done) => {
  mongoose.connection.dropDatabase();
  mongoose.connection.close();
  done();
});

let token;
let id;
describe('User', () => {
  const user = { email: 'valid@email.com', password: 'password' };
  const newUser = { name: 'new', about: 'new' };
  const newAvatar = { avatar: 'http://avatar.com' };
  it('Should return 401 status for /users', async () => {
    const res = await request.get('/users');
    expect(res.status).toBe(401);
  });
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
    expect(res.body.name).toBe(newUser.name);
    expect(res.body.about).toBe(newUser.about);
  });
  it('Should return 200 status code with current user by JWT for /users/me', async () => {
    const res = await request
      .get(`/users/me`)
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(newUser.name);
    expect(res.body.about).toBe(newUser.about);
  });
  it('Should return 200 status code with updated avatar for /users/me/avatar', async () => {
    const res = await request
      .patch('/users/me/avatar')
      .set('Authorization', 'Bearer ' + token)
      .send(newAvatar);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(newUser.name);
    expect(res.body.about).toBe(newUser.about);
    expect(res.body.avatar).toBe(newAvatar.avatar);
  });
});

let cardId;
describe('Card', () => {
  const card = { name: 'card', link: 'http://card.com' };
  it('Should return 201 status code with a new card response for /cards', async () => {
    const res = await request
      .post('/cards')
      .set('Authorization', 'Bearer ' + token)
      .send(card);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(card.name);
    expect(res.body.link).toBe(card.link);
    cardId = res.body._id;
  });
  it('Should return 200 status code with all the cards for /cards', async () => {
    const res = await request
      .get('/cards')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
  it('Should return 200 status code with updated likes array for /cards/:_id/likes', async () => {
    const res = await request
      .put(`/cards/${cardId}/likes`)
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body.likes).toHaveLength(1);
  });
  it('Should return 200 status code with deleted card for /cards/:_id', async () => {
    const res = await request
      .delete(`/cards/${cardId}`)
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(card.name);
    expect(res.body.link).toBe(card.link);
  });
  it('Should return 200 status code with empty array for /cards', async () => {
    const res = await request
      .get('/cards')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });
});
