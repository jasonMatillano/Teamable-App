const { app, server } = require('./server');
const request = require('supertest');

test("update-profile test request with valid payload", async () => {
    const payload = {
        name: "test name", 
        email: "email@gmail.com", 
        interests: "interests"
    };
    const response = await request(app)
            .post('/update-profile')
            .send(payload)
    
    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('info');
    expect(response.body.info).toBe('update user profile successfully');

    server.close();
})

test("update-profile test request with invalid payload", async () => {
    const payload = {};
    const response = await request(app)
            .post('/update-profile')
            .send(payload)
    
    console.log(response.body)
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('invalid payload, could not update profile');

    server.close();
})