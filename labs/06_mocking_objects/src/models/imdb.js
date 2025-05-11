/**
 * Internet Movie Database Access
 * 
 * Implements the SearchTitle, Reviews, and Ratings APIs
 */
const axios = require('axios');

class IMDb {
  /**
   * Access the Internet Movie database
   * @param {string} apikey - The API key for IMDb
   */
  constructor(apikey) {
    this.apikey = apikey;
  }

  /**
   * Search for a movie by Title
   * @param {string} title - The title to search for
   * @returns {Promise<object>} - The search results
   */
  async searchTitles(title) {
    console.log(`Searching IMDb for Title: ${title}`);
    try {
      const response = await axios.get(`https://imdb-api.com/API/SearchTitle/${this.apikey}/${title}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error searching titles:", error.message);
    }
    return {};
  }

  /**
   * Get reviews for a movie
   * @param {string} imdbId - The IMDb ID of the movie
   * @returns {Promise<object>} - The movie reviews
   */
  async movieReviews(imdbId) {
    console.log(`Searching IMDb for Reviews: ${imdbId}`);
    try {
      const response = await axios.get(`https://imdb-api.com/API/Reviews/${this.apikey}/${imdbId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error getting movie reviews:", error.message);
    }
    return {};
  }

  /**
   * Get ratings for a movie
   * @param {string} imdbId - The IMDb ID of the movie
   * @returns {Promise<object>} - The movie ratings
   */
  async movieRatings(imdbId) {
    console.log(`Searching IMDb for Ratings: ${imdbId}`);
    try {
      const response = await axios.get(`https://imdb-api.com/API/Ratings/${this.apikey}/${imdbId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error getting movie ratings:", error.message);
    }
    return {};
  }
}

module.exports = { IMDb };
