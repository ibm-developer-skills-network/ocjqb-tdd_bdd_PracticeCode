/**
 * Pet Steps
 * Steps file for Pet.feature
 */
const { Given } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');

// Load data here

Given('the following pets', async function (dataTable) {
    /**Refresh all Pets in the database*/

    // List all of the pets and delete them one by one
    try {
        const response = await axios.get(`${this.baseUrl}/pets`);
        assert.strictEqual(response.status, 200);
        
        for (const pet of response.data) {
            const deleteResponse = await axios.delete(`${this.baseUrl}/pets/${pet.id}`);
            assert.strictEqual(deleteResponse.status, 204);
        }
    } catch (error) {
        console.error('Error clearing pets:', error.message);
    }

    // load the database with new pets
    const rows = dataTable.hashes();
    for (const row of rows) {
        const payload = {
            name: row.name,
            category: row.category,
            available: ['True', 'true', '1'].includes(row.available),
            gender: row.gender,
            birthday: row.birthday
        };
        
        try {
            const response = await axios.post(`${this.baseUrl}/pets`, payload);
            assert.strictEqual(response.status, 201);
        } catch (error) {
            console.error('Error creating pet:', error.message);
            throw error;
        }
    }
});