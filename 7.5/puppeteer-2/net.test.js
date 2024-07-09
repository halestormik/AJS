const {
  getText,
  selectDay,
  selectMovie,
  chooseSeat,
} = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0);
});

afterEach(async () => {
  await page.close();
});

describe("Cinema tests", () => {
  test("First test: choose a day and movie", async () => {
    await selectDay(page, 3); // выбор дня сеанса
    await selectMovie(page, 190); // выбор сеанса
    const movieTitle = await getText(page, "h2.buying__info-title");
    expect(movieTitle).toContain("Унесенные ветром.");
  }, 60000);

  test("Second test: booking a seat", async () => {
    await selectDay(page, 3); // выбор дня сеанса
    await selectMovie(page, 190); // выбор сеанса
    await chooseSeat(page, 3, 8); // выбор места
    const bookingButtonSelector = `button.acceptin-button`;
    await page.waitForSelector(bookingButtonSelector);
    await page.click(bookingButtonSelector); 
    const choosenMovieTitle = await getText(page, "span.ticket__details.ticket__title");
    expect(choosenMovieTitle).toContain("Унесенные ветром.");
  }, 60000);

  test("Third test: booking a multiple number of seats", async () => {
    await selectDay(page, 3); // выбор дня сеанса
    await selectMovie(page, 190); // выбор сеанса
    await chooseSeat(page, 3, 8); // выбор места
    await chooseSeat(page, 4, 7); // выбор места
    await chooseSeat(page, 2, 1); // выбор места
    const bookingButtonSelector = `button.acceptin-button`;
    await page.waitForSelector(bookingButtonSelector);
    await page.click(bookingButtonSelector); 
    const choosenMovieTitle = await getText(page, "span.ticket__details.ticket__title");
    expect(choosenMovieTitle).toContain("Унесенные ветром.");
  }, 60000);

  test("Fourth test: booking button is not available if the seat in not choosen", async () => {
    await selectDay(page, 3); // выбор дня сеанса
    await selectMovie(page, 190); // выбор сеанса
    const bookingButton = await page.$("button[class='acceptin-button']");
    const actualStatus = await bookingButton.evaluate((btn) => btn.disabled);
    expect(actualStatus).toEqual(true);
  }, 50000);
});