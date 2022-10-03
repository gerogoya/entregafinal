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

    verificarProductos(producto1, producto2, numTarjeta) {

        cy.xpath('//*[@id="name"]//following-sibling::p').invoke('text')
            .should("have.contain", producto1)
            .and("have.contain", producto2)
            .and("contain", numTarjeta)

    }

    verificarPrecioTotalRecibo(precioTotal) {
        cy.contains(`$${precioTotal}`)
    }

} 