const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { getText,
  selectDay,
  selectMovie,
  chooseSeat,
  clickElement, } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php${string}`, {
    setTimeout: 20000,
  });
});

When("user select day {string}", async function (string) {
  await selectDay(this.page, string);
});

When("user select movie {string}", async function (string) {
  await selectMovie(this.page, string);
});

When("user select row {string} and seat {string}", async function (string1, string2) {
  await chooseSeat(this.page, string1, string2);
});

When("user click on a booking button", async function () {
  const bookingButtonSelector = `button.acceptin-button`;
  await clickElement(this.page, bookingButtonSelector);
});

Then("user sees movie title {string}", async function (string) {
  const movieTitle = await getText(this.page, "h2.buying__info-title");
  const expected = await string;
  expect(movieTitle).contains(expected);
});

Then("user sees movie title on a booking page {string}", async function (string) {
  const movieTitle = await getText(this.page, "span.ticket__details.ticket__title");
  const expected = await string;
  expect(movieTitle).contains(expected);
});

Then("user can't click on a submit button", async function () {
  const bookingButton = await this.page.$("button[class='acceptin-button']");
    const actualStatus = await bookingButton.evaluate((btn) => btn.disabled);
    expect(actualStatus).equal(true);
});
