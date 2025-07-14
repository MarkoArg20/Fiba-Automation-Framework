import { expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();



export class NavigationMenu {
    constructor(page) {
        this.page = page
        //this.cookiesAcceptBtn = page.getByRole('button', {name: "I accept"})
        this.headerLogo = page.locator("div.ujnvxr4")
        this.homeBtn = page.getByTestId('HOMEPAGE')
        this.gamesBtn = page.getByTestId('games')
        this.newsBtn = page.getByTestId('news')
        this.rankingsBtn = page.getByTestId('ranking')
        this.calendarBtn = page.getByTestId('events')
        this.moreBtn = page.locator("button[id='radix-:R34mvbkvfa:-trigger-:R14mvbkvfa:']")
        this.searchBtn = page.locator('button[aria-haspopup="dialog"] svg')
        this.logInBtn = page.getByRole('link', { name: 'Login' })
        this.chooseLanguageBtn = page.locator('select._161i9wv3')
        this.gamesModule = page.getByRole('heading', {name:"Games & Results"})
        this.newsModule = page.getByRole('heading', {name: "Top News"})
        this.rankingModule = page.getByRole('heading', { level: 1, name: 'Ranking'})
        this.calendarModule = page.getByRole('heading', {name: "Calendar"})
        this.moreModule = page.locator("div[class='b0kuyqg _1rm9ox0a']")
        this.searchBox = page.getByPlaceholder("Search...")
        this.loginForm = page.locator('form#fiba-login-form')
        this.backBtn = page.locator("span._1strzzav")
        this.chooseLanguageOptions = page.locator("select._161i9wv3 > option")
        this.username = page.locator("input#fiba-email")
        this.password = page.locator("input#fiba-password")
        this.connectBtn = page.getByRole('button', {name: "Connect"})
        
    }

    async assertNavigationMenu() {
        await expect(this.headerLogo).toBeVisible()
        await expect(this.homeBtn).toBeVisible()
        await expect(this.gamesBtn).toBeVisible()
        await expect(this.newsBtn).toBeVisible()
        await expect(this.rankingsBtn).toBeVisible()
        await expect(this.calendarBtn).toBeVisible()
        await expect(this.moreBtn).toBeVisible()
        await expect(this.searchBtn).toBeVisible()
        await expect(this.logInBtn).toBeVisible()
        await expect(this.chooseLanguageBtn).toBeVisible()

} 

 async checkBtnFunctionality() {
    await this.gamesBtn.click()
    await expect(this.gamesModule).toBeVisible()
    await this.newsBtn.dispatchEvent('click')
    await expect(this.newsModule).toBeVisible()
    await this.rankingsBtn.click()
    await expect(this.rankingModule).toBeVisible()
    await this.calendarBtn.click()
    await expect(this.calendarModule).toBeVisible()
    await this.moreBtn.click()
    await expect(this.moreModule).toBeVisible()
    await this.searchBtn.click()
    await expect(this.searchBox).toBeVisible()
    await this.page.keyboard.press('Escape')
    await this.logInBtn.click()
    await expect(this.loginForm).toBeVisible()
    await this.backBtn.click()
    await this.chooseLanguageBtn.click()
    const optionsDropDown = this.chooseLanguageOptions
    await expect(optionsDropDown).toHaveText(['EN', 'FR', 'ES'])
 }

async logIn(username, password) {
    await this.logInBtn.click()
    await this.username.fill(username)
    await this.password.fill(password)
    await this.connectBtn.click()
}

}


exports.NavigationMenuApi = class NavigationMenuApi {
    constructor(request) {
        this.request = request
    }

    async checkGamesApiStatusCode() { //krstuvanje podobro (nomenclature)
       this.getGamesApi = await this.request.get(process.env.GETGAMES)
       expect(this.getGamesApi.status()).toBe(200)
        
    }
    async checkNewsApiStatusCode() {
        this.getNewsApi = await this.request.get(process.env.GETNEWS)
        expect(this.getNewsApi.status()).toBe(200)
    }
    async checkRankingApiStatusCode() {
        this.getEventsApi = await this.request.get(process.env.GETEVENTS)
        expect(this.getEventsApi.status()).toBe(200)
    }
     async checkCalendarApiStatusCode() {
     this.getCalendarApi = await this.request.get(process.env.GETCALENDAR, {
            headers: {
        'ocp-apim-subscription-key' : '898cd5e7389140028ecb42943c47eb74'
      }
        }) 
              expect(this.getCalendarApi.status()).toBe(200)

    }
    async checkHomeApiStatusCode() {
        this.getHomeApi = await this.request.get(process.env.BASEURL)
        expect(this.getHomeApi.status()).toBe(200)
    }

    
    async logInApi(email, password) {
        
         this.logInApiEndpoint =  await this.request.post(process.env.POSTLOGIN, {
            data: { //da se stavi u poseben fajl
                "client_id": "0eXXq6dvMmGS7Itn2uyu",
                "email": email,
                "password": password,
                "scope": "openid profile email phone address full_write"
            }
        })
        return this.logInApiEndpoint
        }
}    