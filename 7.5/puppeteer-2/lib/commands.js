
module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  selectDay: async function (page, day) {
    try {
      const selector = `nav > a:nth-child(${day}) > span.page-nav__day-number`;
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Day selector is not clickable: ${selector}`);
    }
  },

  selectMovie: async function (page, movieID) {
    try {
      const selector = `a[data-seance-id=\'${movieID}\']`;
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Movie selector is not clickable: ${selector}`);
    }
  },

  chooseSeat: async function (page, row, seat) {
    try {
      const seatSelector = `main > section > div > div > div:nth-child(${row}) > span:nth-child(${seat})`;
      await page.waitForSelector(seatSelector);
      await page.click(seatSelector);
    } catch (error) {
      throw new Error(`Seat selector is not clickable: ${seatSelector}`);
    }
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },
};
