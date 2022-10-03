export class HomePage {
    constructor () {
        this.OnlineShopLink = "#onlineshoplink"
    }

    clickOnlineShop_Link() {
        cy.get(this.OnlineShopLink).click()
    }
} 