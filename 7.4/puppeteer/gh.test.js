let page;

beforeEach(async () => {
  page = await browser.newPage();
  //await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    await page.goto("https://github.com/team");
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
  }, 3000);

  test("The first link attribute", async () => {
    await page.goto("https://github.com/team");
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 4000);

  test("The page contains Sign in button", async () => {
    await page.goto("https://github.com/team");
    const btnSelector = ".btn-muted-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 5000);
});

describe("Titles of other pages", () => {
  
  test("marketplace page checking element", async () => {
    await page.goto("https://github.com/marketplace");
    const selector = "span[id=':R1aqqb:--label']";
      await page.waitForSelector(selector, {
        visible: true,
      });
      const actual = await page.$eval(selector, link => link.textContent);
    expect(actual).toContain("Copilot")
}, 6000);

test("The h1 header marketplace", async () => {
  await page.goto("https://github.com/marketplace");
  const firstLink = await page.$("header div div a");
  await firstLink.click();
  await page.waitForSelector('h1');
  const title2 = await page.title();
  expect(title2).toEqual("Marketplace · Tools to improve your workflow · GitHub");
}, 6000);

test("The first link attribute", async () => {
  await page.goto("https://github.com/marketplace");
  const actual = await page.$eval("a", link => link.getAttribute('href') );
  expect(actual).toEqual("#start-of-content");
}, 6000);

});
