import { test, expect } from '@playwright/test';

const baseURL = 'https://petstore.swagger.io/v2';

test.describe('Petstore API User Tests', () => {
  const user = {
    id: 12345,
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    password: 'password123',
    phone: '1234567890',
    userStatus: 1,
  };

  test('POST: Create user', async ({ request }) => {
    const response = await request.post(`${baseURL}/user`, { data: user });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.code).toBe(200);
    expect(responseBody.type).toBe('unknown');
    expect(responseBody.message).toBe(String(user.id));
  });

  test('PUT: Update user', async ({ request }) => {
    await request.post(`${baseURL}/user`, { data: user });
    const updatedUser = {
      ...user,
      firstName: 'Updated',
      email: 'updated@example.com',
    };
    const response = await request.put(`${baseURL}/user/${user.username}`, {
      data: updatedUser,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.code).toBe(200);
    expect(responseBody.type).toBe('unknown');
    expect(responseBody.message).toBe('12345');
  });

  test('DELETE: Delete user', async ({ request }) => {
    await request.post(`${baseURL}/user`, { data: user });
    const response = await request.delete(`${baseURL}/user/${user.username}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.code).toBe(200);
    expect(responseBody.type).toBe('unknown');
    expect(responseBody.message).toBe(user.username);
  });
});
