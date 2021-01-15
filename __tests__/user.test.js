const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');


const agent = request.agent(app);

describe('realo-app-backend routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/auth.sql', 'utf-8'));
  });

  afterAll(() => {
    pool.end();
  });

  it('/POST allowing user to sign up', async() => {
    const res = await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        name: 'Jon Arbuckle',
        phoneNumber: '1235671234',
        carrier: 'att'
      });

    expect(res.body).toEqual({
      userId: expect.any(String),
      email: 'test@test.com',
      name: 'Jon Arbuckle',
      phoneNumber: '1235671234',
      carrier: 'att'
    });
  });


});
