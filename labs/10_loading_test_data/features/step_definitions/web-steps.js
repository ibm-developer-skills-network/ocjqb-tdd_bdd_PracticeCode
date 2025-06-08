const { Given, When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');

const ID_PREFIX = 'pet_';

Given('I am on the {string}', async function (pageName) {
  // Make a call to the base URL
  await this.driver.get(this.baseUrl);
});

When('I set the {string} to {string}', async function (elementName, textString) {
  const elementId = ID_PREFIX + elementName.toLowerCase().replace(' ', '_');
  const element = await this.driver.findElement(By.id(elementId));
  await element.clear();
  await element.sendKeys(textString);
});

When('I click the {string} button', async function (button) {
  const buttonId = button.toLowerCase() + '-btn';
  await this.driver.findElement(By.id(buttonId)).click();
});

Then('I should see the message {string}', async function (message) {
  const found = await this.driver.wait(
    until.elementTextContains(this.driver.findElement(By.id('flash_message')), message),
    this.waitSeconds
  );
  assert.ok(found, 'Expected to find the message but did not');
});

Then('I should see {string} in the results', async function (name) {
  const found = await this.driver.wait(
    until.elementTextContains(this.driver.findElement(By.id('search_results')), name),
    this.waitSeconds
  );
  assert.ok(found, 'Expected to find the name in results but did not');
});

Then('I should not see {string} in the results', async function (name) {
  const element = await this.driver.findElement(By.id('search_results'));
  const text = await element.getText();
  assert.ok(!text.includes(name), `Expected not to find ${name} in results but did`);
});
