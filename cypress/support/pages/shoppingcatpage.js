export class ShopingCartPage {
    
    verificarPrecio(producto, precio) {

        cy.xpath(`//*[text()="${producto}"]//following-sibling::p[@id="productPrice"]`).invoke('text').then((text1) => {
            expect(text1).to.eq(`$${precio}`)
        }
        )
    }

    verificarProducto(producto1, producto2) {
        cy.contains(producto1)
        cy.contains(producto2)    
    }



    clickShowTotalPrice() {
        cy.contains('Show total price').click()
    }

    verificarPrecioTotal(precioTotal) {
        cy.get('#price').invoke('text').should('be.equal', precioTotal)
    }

    clickGoToCheckout_Btn() {
        cy.contains('Go to Checkout').click()
    }
} 