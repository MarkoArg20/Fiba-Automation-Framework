import { expect } from '@playwright/test';
require('dotenv').config();


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
        this.outsideSearchBtn = page.locator("div[role='dialog']")
        this.logInBtn = page.getByRole('link', { name: 'Login' })
        this.chooseLanguageBtn = page.locator('select._161i9wv3')
        this.gamesModule = page.getByRole('heading', { name: "Games & Results" })
        this.newsModule = page.getByRole('heading', { name: "Top News" })
        this.rankingModule = page.getByRole('heading', { level: 1, name: 'Ranking' })
        this.calendarModule = page.getByRole('heading', { name: "Calendar" })
        this.moreModule = page.locator("div[class='b0kuyqg _1rm9ox0a']")
        this.searchBox = page.getByPlaceholder("Search...")
        this.loginForm = page.locator('form#fiba-login-form')
        this.backBtn = page.locator("span._1strzzav")
        this.chooseLanguageOptions = page.locator("select._161i9wv3 > option")
        this.username = page.locator("input#fiba-email")
        this.password = page.locator("input#fiba-password")
        this.connectBtn = page.getByRole('button', { name: "Connect" })
        this.myAccountBtn = page.locator('a[href="https://www.fiba.basketball/en/my-account"]')
        this.myAccountHeading = page.getByText("My account")
        this.succesfulLogInMsg = page.locator('div._1qs1wm7b')
        this.acceptCookiesBtn = page.getByRole('button', { name: "I accept" })
        this.closeCupsPopup = page.locator("button._9ja35n0>*")
        this.validationMsgInvalidUsernameAndPass = page.getByText('Invalid or expired credentials. Please double-check or use the "Forgot password?" link to reset your password.')

    }

    async preparePageOnLoad() {
        await this.acceptCookiesBtn.click()
        await this.closeCupsPopup.click()

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
        await this.gamesBtn.dispatchEvent('click')
        await expect(this.gamesModule).toBeVisible()
        await this.newsBtn.dispatchEvent('click')
        await expect(this.newsModule).toBeVisible()
        await this.rankingsBtn.click()
        await expect(this.rankingModule).toBeVisible()
        await this.calendarBtn.dispatchEvent('click')
        await expect(this.calendarModule).toBeVisible()
        await this.moreBtn.dispatchEvent('click')
        await expect(this.moreModule).toBeVisible()
        await this.searchBtn.click()
        await expect(this.searchBox).toBeVisible()
        await this.outsideSearchBtn.click()
        await expect(this.searchBox).toBeHidden()
        await this.logInBtn.click()
        await expect(this.loginForm).toBeVisible()
        await this.backBtn.dispatchEvent('click')
        await this.chooseLanguageBtn.dispatchEvent('click')
        const optionsDropDown = this.chooseLanguageOptions
        await expect(optionsDropDown).toHaveText(['EN', 'FR', 'ES'])
    }

    async logIn(username, password) {
        await this.logInBtn.click()
        await this.username.fill(username)
        await this.password.fill(password)
        await this.connectBtn.dispatchEvent('click')
    }

    async assertValidationMsgInvalidUsernameOrPass() {

        await expect(this.validationMsgInvalidUsernameAndPass).toBeVisible()

    }

    async assertSuccessfulLogin() {

        //await expect(this.succesfulLogInMsg).toBeVisible()  // I remove this because the test with this is flaky (sometimes the popup is loaded slower and PW cant catch it)
        await expect(this.myAccountBtn).toBeVisible()
        await this.myAccountBtn.dispatchEvent('click')
        await expect(this.myAccountHeading).toBeVisible()

    }
}


exports.NavigationMenuApi = class NavigationMenuApi {
    constructor(request) {
        this.request = request
    }

    async assertGamesApiStatusCodeIs200() {
        this.getGamesApi = await this.request.get(process.env.GET_GAMES_URL)
        expect(this.getGamesApi.status()).toBe(200)

    }
    async assertNewsApiStatusCodeIs200() {
        this.getNewsApi = await this.request.get(process.env.GET_NEWS_URL)
        expect(this.getNewsApi.status()).toBe(200)
    }
    async assertRankingStatusCodeIs200() {
        this.getEventsApi = await this.request.get(process.env.GET_EVENTS_URL)
        expect(this.getEventsApi.status()).toBe(200)
    }
    async assertCalendarStatusCodeIs200() {
        this.getCalendarApi = await this.request.get(process.env.GET_CALENDAR_URL, {
            headers: {
                'ocp-apim-subscription-key': '898cd5e7389140028ecb42943c47eb74'
            }
        })
        expect(this.getCalendarApi.status()).toBe(200)

    }
    async assertHomeApiStatusCodeIs200() {
        this.getHomeApi = await this.request.get(process.env.BASE_URL)
        expect(this.getHomeApi.status()).toBe(200)
    }


    async logInApi(email, password) {

        this.logInApiEndpoint = await this.request.post(process.env.POST_LOGIN_URL, {
            data: {
                "client_id": "0eXXq6dvMmGS7Itn2uyu",
                "email": email,
                "password": password,
                "scope": "openid profile email phone address full_write"
            }
        })
        return this.logInApiEndpoint
    }
}    