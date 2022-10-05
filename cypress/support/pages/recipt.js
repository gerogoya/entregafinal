export class ReciptPage {

    clickAddToCart_Btn(producto) {
        cy.log(producto)
        cy.contains(producto)
        cy.xpath(`//*[text()="${producto}"]//following-sibling::button`).click()
        cy.get('#closeModal').click()
    }
    verificarNombreApellidoEnRecibo(nombre, apellido) {
        cy.get('#name', { timeout: 60000 }).invoke('text').should('contain', `${nombre} ${apellido}`)
    }

    verificarProducto(producto) {
        cy.get("#name").siblings().invoke('text').should("contain", producto) 
    }

    verificarTarjeta(numTarjeta) {
        cy.xpath('//*[@id="name"]//following-sibling::p').invoke('text')
            .should("contain", numTarjeta)
    }



    verificarPrecioTotalRecibo(precioTotal) {
        cy.contains(`$${precioTotal}`)
    }

} 