export class ProductListPage {
    constructor () {
     //   this.OnlineShopLink = "#onlineshoplink"
    }

    clickAddToCart_Btn(producto) {
        // cy.get(this.OnlineShopLink).click()
        cy.log(producto)
        cy.contains(producto)
        cy.xpath(`//*[text()="${producto}"]//following-sibling::button`).click()
        cy.get('#closeModal').click()


    }
    clickGoToShoppingCart_Btn(){
        cy.get('#goShoppingCart').click()
    }
} 