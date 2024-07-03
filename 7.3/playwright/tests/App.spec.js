const { test, expect } = require("@playwright/test");
const {email, password} = require('../user.js');

test("Successfull authorization", async ({ page }) => {
  // Go to https://netology.ru/?modal=sign_in
  await page.goto("https://netology.ru/?modal=sign_in");
  test.setTimeout(7500000);
  await page.getByPlaceholder('Email').click();
  await page.fill('[placeholder="Email"]', email);
  await page.getByPlaceholder('Пароль').click();
  await page.fill('[placeholder="Пароль"]', password);
  await page.getByTestId('login-submit-btn').click();
  await expect(page).toHaveURL("https://netology.ru/profile/8909874");
});

test("Unsuccessfull authorization", async ({ page }) => {
  // Go to https://netology.ru/?modal=sign_in
  await page.goto("https://netology.ru/?modal=sign_in");
  test.setTimeout(7500000);
  await page.getByPlaceholder('Email').click();
  await page.fill('[placeholder="Email"]', 'testemailnetology@mail.ru');
  await page.getByPlaceholder('Пароль').click();
  await page.fill('[placeholder="Пароль"]', 'password111');
  await page.getByTestId('login-submit-btn').click();
  await expect(page.locator('[data-testid=login-error-hint]')).toHaveText('Вы ввели неправильно логин или пароль');
});
