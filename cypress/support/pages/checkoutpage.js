export class CheckOutPage {
    
    ingresarDatosPago(nombreUsuarioTarjeta, apellidoUsuarioTarjeta, numTarjeta) {
        cy.get('#FirstName').type(nombreUsuarioTarjeta)
        cy.get('#lastName').type(apellidoUsuarioTarjeta)
        cy.get('#cardNumber').type(numTarjeta)

    }

    clickPurchase_Btn(){
        cy.contains("Purchase").click()
    }


} 