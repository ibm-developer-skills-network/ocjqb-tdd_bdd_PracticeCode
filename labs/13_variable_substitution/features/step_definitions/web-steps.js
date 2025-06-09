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
    await this.driver.get(this.baseUrl);
});

When('I set the "Category" to "dog"', async function () {
    const element = await this.driver.findElement(By.id('pet_category'));
    await element.clear();
    await element.sendKeys('dog');
});

When('I click the "Search" button', async function () {
    const element = await this.driver.findElement(By.id('search-btn'));
    await element.click();
});

Then('I should see the message "Success"', async function () {
    const element = await this.driver.findElement(By.id('flash_message'));
    const text = await element.getText();
    assert(text.includes("Success"));
});

Then('I should see "Fido" in the results', async function () {
    const element = await this.driver.findElement(By.id('search_results'));
    const text = await element.getText();
    assert(text.includes("Fido"));
});

Then('I should not see "Kitty" in the results', async function () {
    const element = await this.driver.findElement(By.id('search_results'));
    const text = await element.getText();
    assert(!text.includes("Kitty"));
});

Then('I should not see "Leo" in the results', async function () {
    const element = await this.driver.findElement(By.id('search_results'));
    const text = await element.getText();
    assert(!text.includes("Leo"));
});