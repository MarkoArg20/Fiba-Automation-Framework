import { test, expect, request } from '@playwright/test'
import { ok } from 'assert'
require('dotenv').config();

import { NavigationMenuApi } from '../pages/homePage';

let navigationMenuApi

test.beforeEach(async ({ page, request }) => {

  navigationMenuApi = new NavigationMenuApi(request) // creating an instance of the class

})


test('ODREDI IME POSLE', async ({ page, request }) => {

  await navigationMenuApi.assertGamesApiStatusCodeIs200()
  await navigationMenuApi.assertNewsApiStatusCodeIs200()
  await navigationMenuApi.assertRankingStatusCodeIs200()
  await navigationMenuApi.assertCalendarStatusCodeIs200()
  await navigationMenuApi.assertHomeApiStatusCodeIs200()
  
})

test('login with wrong password', async ({ page, request }) => {

  const logInApiEndpoint = await navigationMenuApi.logInApi('markoargirovski07@gmail.com', 'markomarko123asdadasd')

  expect(logInApiEndpoint.status()).toBe(401)


})

test('login with wrong username', async ({ page, request }) => {


  const logInApiEndpoint = await navigationMenuApi.logInApi('markoargirovski07@gmail.com', 'markomarko123asdadasd')

  expect(logInApiEndpoint.status()).toBe(401)

})

test('Succesfull login', async ({ page, request }) => {


  const logInApiEndpoint = await navigationMenuApi.logInApi(process.env.FIBA_USERNAME, process.env.PASSWORD)

  expect(logInApiEndpoint.status()).toBe(200)

})




