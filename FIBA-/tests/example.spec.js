import { test, expect } from '@playwright/test';
const { NavigationMenu } = require('../pages/homePage')
let navigationMenu
require('dotenv').config();




test.beforeEach(async ({ page }) => {
  navigationMenu = new NavigationMenu(page)
  await page.goto(process.env.BASE_URL) 
  await navigationMenu.preparePageOnLoad()
})

test('Assert if navigation menu is available and all the buttons in it', async ({ page }) => {

  await navigationMenu.assertNavigationMenu()

});
test('Check button functionality', async ({ page }) => {

  await navigationMenu.checkBtnFunctionality()

});

test('Successful login', async ({ page }) => {
  await navigationMenu.logIn(process.env.FIBA_USERNAME, process.env.PASSWORD)
  await navigationMenu.assertSuccessfulLogin()
})

test('Unsuccesful login - try to login with invalid password', async ({ page }) => {

  await navigationMenu.logIn(process.env.FIBA_USERNAME, '123'/* wrong password */)
  await expect(page.getByText('Invalid or expired credentials. Please double-check or use the "Forgot password?" link to reset your password.')).toBeVisible() // i ova vo funkcija

})

test('Unsuccesful login - invalid username', async ({ page }) => {

  await navigationMenu.logIn('test@yahoo.com' /* wrong username */, process.env.PASSWORD)
  await expect(page.getByText('Invalid or expired credentials. Please double-check or use the "Forgot password?" link to reset your password.')).toBeVisible() // i ova vo funkcija

})