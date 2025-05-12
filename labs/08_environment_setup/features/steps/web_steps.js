const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

// Navigation steps
Given('I navigate to {string}', async function(url) {
  await this.page.goto(url, { waitUntil: 'networkidle2' });
});

// Verification steps
Then('I should see {string} in the page title', async function(titleText) {
  const title = await this.page.title();
  expect(title).to.include(titleText);
});

Then('I should see text {string} on the page', async function(text) {
  const content = await this.page.content();
  expect(content).to.include(text);
});

Then('I should see an element with selector {string}', async function(selector) {
  const element = await this.page.$(selector);
  expect(element).to.not.be.null;
});

Then('I should see a link with text {string}', async function(linkText) {
  const links = await this.page.$$eval('a', links => 
    links.map(link => link.textContent.trim())
  );
  expect(links).to.include(linkText);
});

Then('the link with text {string} should have URL containing {string}', async function(linkText, urlPart) {
  const href = await this.page.$eval(`a:contains("${linkText}")`, link => link.href);
  expect(href).to.include(urlPart);
});

// Interaction steps
When('I click on the link with text {string}', async function(linkText) {
  await this.page.click(`a:contains("${linkText}")`);
  await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
});

When('I fill in {string} with {string}', async function(fieldName, value) {
  await this.page.type(`input[name="${fieldName}"]`, value);
});

When('I click the button {string}', async function(buttonText) {
  await this.page.click(`button:contains("${buttonText}")`);
  await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
});
