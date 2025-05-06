/**
 * Simple logger utility
 */
const logger = {
    info: (message, ...args) => {
      console.log(`INFO: ${message}`, ...args);
    },
    error: (message, ...args) => {
      console.error(`ERROR: ${message}`, ...args);
    },
    warn: (message, ...args) => {
      console.warn(`WARNING: ${message}`, ...args);
    },
    debug: (message, ...args) => {
      console.debug(`DEBUG: ${message}`, ...args);
    }
  };
  
  module.exports = logger;