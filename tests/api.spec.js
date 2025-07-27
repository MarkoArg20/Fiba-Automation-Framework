import { test, expect, request } from '@playwright/test'
import { ok } from 'assert'
require('dotenv').config();


import { NavigationMenuApi } from '../pages/homePage';
//const { generateCodeChallenge } = require(i'../pkceUtils');


//import * as dotenv from 'dotenv';
let navigationMenuApi

test.beforeEach(async ({ page, request }) => {
  navigationMenuApi = new NavigationMenuApi(request) // creating an instance of the class
})


test('ODREDI IME POSLE', async ({ page, request }) => {

  await navigationMenuApi.checkGamesApiStatusCode()
  await navigationMenuApi.checkNewsApiStatusCode()
  await navigationMenuApi.checkRankingApiStatusCode()
  await navigationMenuApi.checkCalendarApiStatusCode()
  await navigationMenuApi.checkHomeApiStatusCode()
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



/* test('login', async ({ page, request }) => {

  const povik = await request.post('https://auth.fiba.basketball/identity/v1/password/login', {
    data: {
      client_id: "0eXXq6dvMmGS7Itn2uyu",
      email: "markoargirovski07@gmail.com",
      password: "Kabel@11",
      scope: "openid profile email phone address full_write"
    }
  })

  const res = await povik.json();
  const tkn = res.tkn
  console.log('Response body od prviot povik:', tkn);




  // ovde do sega zaklucok: Izgleda ne moze da se avtomatizira preku povici, zatoa so mora preku UI, obidi se preku UI naredno i zemi go tokenot i posle koristi go

  const { codeVerifier, codeChallenge } = await generateCodeChallenge();

  const apiGetAuth = await request.get(`https://auth.fiba.basketball/oauth/authorize?client_id=0eXXq6dvMmGS7Itn2uyu&response_type=code&origin=web%2Fen%2Fhub&state=eyJyZWRpcmVjdFVyaSI6Imh0dHBzOi8vd3d3LmZpYmEuYmFza2V0YmFsbC9lbiJ9&redirect_uri=https%3A%2F%2Fwww.fiba.basketball%2Fauth-callback&scope=openid%20profile%20email%20phone%20address%20full_write&response_mode=web_message&prompt=none&code_challenge=${codeChallenge}&code_challenge_method=S256&tkn=${tkn}`)

  console.log(await apiGetAuth.json)
  console.log('bitno', apiGetAuth)

  /* 
          const tokenPovik = await request.post("https://auth.fiba.basketball/oauth/token", {
  
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            form: {
              client_id: '0eXXq6dvMmGS7Itn2uyu',
              code: code,
              code_verifier: code_verifier,
              grant_type: "authorization_code",
              redirect_uri: "https://www.fiba.basketball/auth-callback"
            }
          });
  
   */
  // console.log(tokenPovik)




 /*  await page.goto('https://www.fiba.basketball/en/my-account')
  await page.waitForTimeout(1100)
}) */ 


