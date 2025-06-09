/**
 * Web Steps
 * Steps file for web interactions with Selenium
 * For information on Waiting until elements are present in the HTML see:
 *     https://selenium-python.readthedocs.io/waits.html
 */

const { Given, When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');

Given('I am on the "Home Page"', async function () {
    throw new Error('Not implemented: Given I am on the "Home Page"');
});

When('I set the "Category" to "dog"', async function () {
    throw new Error('Not implemented: When I set the "Category" to "dog"');
});

When('I click the "Search" button', async function () {
    throw new Error('Not implemented: When I click the "Search" button');
});

Then('I should see the message "Success"', async function () {
    throw new Error('Not implemented: Then I should see the message "Success"');
});

Then('I should see "Fido" in the results', async function () {
    throw new Error('Not implemented: Then I should see "Fido" in the results');
});

Then('I should not see "Kitty" in the results', async function () {
    throw new Error('Not implemented: Then I should not see "Kitty" in the results');
});

Then('I should not see "Leo" in the results', async function () {
    throw new Error('Not implemented: Then I should not see "Leo" in the results');
});