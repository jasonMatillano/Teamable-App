const {  isInvalidEmail, isEmptyPayload } = require('../validator');

test ('invalid email', () => {
    const testPayload = {
        name: 'name', 
        email: 'email', 
        interests: 'interests'
    };
    
    const result = isInvalidEmail(testPayload);
    expect(result).toBe(true);
})

test ('valid email', () => {
    const testPayload = {
        name: 'name', 
        email: 'email@gmail.com', 
        interests: 'interests'
    };
    
    const result = isInvalidEmail(testPayload);
    expect(result).toBe(false);
})

test ('empty payload', () => {
    const testPayload = {};
    
    const result = isEmptyPayload(testPayload);
    expect(result).toBe(true);
})

test ('valid payload', () => {
    const testPayload = {
        name: 'name', 
        email: 'email@gmail.com', 
        interests: 'interests'
    };
    
    const result = isEmptyPayload(testPayload);
    expect(result).toBe(false);
})