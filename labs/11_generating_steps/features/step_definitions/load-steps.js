/**
 * Pet Steps
 * Steps file for Pet.feature
 * For information on Waiting until elements are present in the HTML see:
 *    https://selenium-webdriver.herokuapp.com/docs/api/until/
 */
const { Given } = require('@cucumber/cucumber');
const axios = require('axios');

// Load data here

Given('the following pets', async function (dataTable) {
  // Refresh all Pets in the database

  // List all of the pets and delete them one by one
  const response = await axios.get(`${this.base_url}/pets`);
  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
  
  for (const pet of response.data) {
    const deleteResponse = await axios.delete(`${this.base_url}/pets/${pet.id}`);
    if (deleteResponse.status !== 204) {
      throw new Error(`Expected status 204, got ${deleteResponse.status}`);
    }
  }

  // load the database with new pets
  for (const row of dataTable.hashes()) {
    const payload = {
      name: row.name,
      category: row.category,
      available: ['True', 'true', '1'].includes(row.available),
      gender: row.gender,
      birthday: row.birthday
    };
    
    const createResponse = await axios.post(`${this.base_url}/pets`, payload);
    if (createResponse.status !== 201) {
      throw new Error(`Expected status 201, got ${createResponse.status}`);
    }
  }
});