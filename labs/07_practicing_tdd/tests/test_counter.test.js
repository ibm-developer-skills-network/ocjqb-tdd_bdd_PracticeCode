/**
 * Test Cases for Counter Web Service
 */
const request = require('supertest');
const statusCodes = require('../src/status');
const app = require('../src/counter');

describe('Counter Web Service', () => {
    test('should create a counter', async () => {
        const response = await request(app)
            .post('/counters/foo')
            .expect(statusCodes.HTTP_201_CREATED);
        
        expect(response.body).toHaveProperty('foo');
        expect(response.body.foo).toBe(0);
    });

    test('should return an error for duplicates', async () => {
        // Create first counter
        await request(app)
            .post('/counters/bar')
            .expect(statusCodes.HTTP_201_CREATED);
        
        // Try to create duplicate
        await request(app)
            .post('/counters/bar')
            .expect(statusCodes.HTTP_409_CONFLICT);
    });
});
