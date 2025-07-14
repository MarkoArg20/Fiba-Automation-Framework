// @ts-check //testttttttttttttttt
import { test, expect } from '@playwright/test';
const { NavigationMenu } = require('../pages/homePage')
let navigationMenu

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.fiba.basketball/en")
  await page.getByRole('button', { name: "I accept" }).click() //ova vo pom isto
  navigationMenu = new NavigationMenu(page)
})

test('Check if navigation menu is available and all the buttons in it', async ({ page }) => {

  await navigationMenu.assertNavigationMenu()

});
test('Check button functionality', async ({ page }) => {

  await navigationMenu.checkBtnFunctionality()

});

test.only('Succesfull login', async ({ page }) => {

  await page.keyboard.press('Escape');
  await navigationMenu.logIn(process.env.USERNAME1, process.env.PASSWORD)
  await page.locator('a[class="_1xrgtvf2 _1xrgtvf0"]').click() //da se vidi ova sto e zasto a hardoced i da ne bide
  await expect(page.getByText("My account")).toBeVisible() // i ova isto taka

})

test.only('Unsuccesfull login - invalid password', async ({ page }) => {

  await page.keyboard.press('Escape');
  await navigationMenu.logIn(process.env.USERNAME1, '123'/* wrong password */)
  await expect(page.getByText('Invalid or expired credentials. Please double-check or use the "Forgot password?" link to reset your password.')).toBeVisible() // i ova vo funkcija

})

test.only('Unsuccesfull login - invalid username', async ({ page }) => {

  await page.keyboard.press('Escape');
  await navigationMenu.logIn('test@yahoo.com' /* wrong username */, process.env.PASSWORD)
  await expect(page.getByText('Invalid or expired credentials. Please double-check or use the "Forgot password?" link to reset your password.')).toBeVisible() // i ova vo funkcija

})