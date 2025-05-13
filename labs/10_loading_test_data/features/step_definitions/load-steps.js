const { Given } = require('@cucumber/cucumber');
const axios = require('axios');

Given('the following pets', async function (dataTable) {
  // Refresh all Pets in the database
  
  // List all pets and delete them one by one
  const response = await axios.get(`${this.baseUrl}/pets`);
  expect(response.status).toBe(200);
  
  for (const pet of response.data) {
    const deleteResponse = await axios.delete(`${this.baseUrl}/pets/${pet.id}`);
    expect(deleteResponse.status).toBe(204);
  }
  
  // Load the database with new pets
  for (const row of dataTable.hashes()) {
    const payload = {
      name: row.name,
      category: row.category,
      available: ['True', 'true', '1'].includes(row.available),
      gender: row.gender,
      birthday: row.birthday
    };
    
    const postResponse = await axios.post(`${this.baseUrl}/pets`, payload);
    expect(postResponse.status).toBe(201);
  }
});
