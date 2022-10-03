require('cypress-xpath')
import { HomePage } from "../support/pages/homapage"
import { ProductListPage } from "../support/pages/productlistpage"
import { ShopingCartPage } from "../support/pages/shoppingcatpage"
import { CheckOutPage } from "../support/pages/checkoutpage"
import { ReciptPage } from "../support/pages/recipt"
// shift + alt + F (ordenar)

describe('Entrega Final', () => {
    let producto, datosTarjeta
    const homepage = new HomePage();
    const productpage = new ProductListPage();
    const shoppingcatpage = new ShopingCartPage();
    const checkoutpage = new CheckOutPage();
    const reciptpage = new ReciptPage();


    const endpoint_register = "http://pushing-it.herokuapp.com/api/register"
    const endpoint_login = "https://pushing-it-backend.herokuapp.com/api/login"
    const endpoint_delete = "https://pushing-it-backend.herokuapp.com/api/deleteuser/"

    const usuario = Math.floor(Math.random() * 10000)
    const password = "123456!"
    const gender = "Male"
    const year = "1990"
    const month = "05"
    const day = "10"


    before("before", () => {
        cy.fixture("productos").then(data => {
            producto = data;
        })
        cy.fixture("datosTarjeta").then(data => {
            datosTarjeta = data;
        })

    })

    beforeEach("Login usando request", () => {
        cy.request(
            {
                url: endpoint_register,
                method: "POST",
                body: {
                    "username": usuario,
                    "password": password,
                    "gender": gender,
                    "year": year,
                    "month": month,
                    "day": day
                }
            }
        ).then(respuesta => {
            expect(respuesta.status).to.equal(200)
        }).then(() => {

            cy.request(
                {
                    url: endpoint_login,
                    method: "POST",
                    body: {
                        "username": usuario,
                        "password": password,
                    }
                }
            ).then(respuesta => {
                window.localStorage.setItem("token", respuesta.body.token)
                window.localStorage.setItem("user", respuesta.body.user.username)
            })

        })
        cy.visit("/");
    })

    it('Test', () => {
        homepage.clickOnlineShop_Link();
        productpage.clickAddToCart_Btn(producto.producto1);
        productpage.clickAddToCart_Btn(producto.producto2);
        productpage.clickGoToShoppingCart_Btn()
        shoppingcatpage.verificarPrecio(producto.producto1, producto.precioproducto1)
        shoppingcatpage.verificarPrecio(producto.producto2, producto.precioproducto2)
        shoppingcatpage.verificarProducto(producto.producto1, producto.producto2)
        shoppingcatpage.clickShowTotalPrice();
        shoppingcatpage.verificarPrecioTotal(`${producto.precioproducto1 + producto.precioproducto2}`)
        shoppingcatpage.clickGoToCheckout_Btn()
        checkoutpage.ingresarDatosPago(datosTarjeta.nombre, datosTarjeta.apellido, datosTarjeta.numTarjeta)
        checkoutpage.clickPurchase_Btn()
        reciptpage.verificarNombreApellidoEnRecibo(datosTarjeta.nombre, datosTarjeta.apellido)
        reciptpage.verificarProductos(producto.producto1, producto.producto2, datosTarjeta.numTarjeta)
        reciptpage.verificarPrecioTotalRecibo(producto.precioproducto1 + producto.precioproducto2)

    })

    after("Borrar Usuario", () => {
        cy.request(
            {
                url: endpoint_delete + usuario,
                method: "DELETE",
            }
        ).then(() => {
            cy.request({
                method: "GET",
                url: endpoint_delete + usuario,
                failOnStatusCode: false
            }).then(respuesta => {
                expect(respuesta.status).to.equal(404)

            })
        })

    })
})          