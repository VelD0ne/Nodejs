import { describe, expect, test } from '@jest/globals';
import request from 'supertest';

const baseURL = 'http://localhost:3000';
const username = 'Tester2020';
const password = 'password';

describe('user registration', () => {
  test('registr new user', async () => {
    const newUser = {
      username,
      password,
    };

    const response = await request(baseURL).post('/registr').send(newUser);

    expect(response.status).toEqual(200);
  });
  test('login with JWT', async () => {
    const User = {
      username,
      password,
    };
    const response = await request(baseURL).get('/JWT').send(User);
    const token = `bearer ${response.body.accessToken}`;

    const answer = await request(baseURL)
      .post('/login/JWT')
      .set('Authorization', token);

    expect(answer.status).toEqual(302);
  });
});
