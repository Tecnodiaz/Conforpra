const { ipcRenderer } = require("electron")

let FacturaPrint2
let mylistPrint
let tablaResul
let Factura
let BtnDescargar
let BtnPrint
let comentarioP
let FacturaPrint3

document.addEventListener("DOMContentLoaded", function(){
    FacturaPrint2 = document.getElementById("FacturaPrint2")
    mylistPrint =document.getElementById("mylistPrint")    
    tablaResul = document.getElementById("tablaResul")
    BtnPrint = document.getElementById("BtnPrint")
    BtnDescargar = document.getElementById("BtnDescargar")
    comentarioP = document.getElementById("comentarioP")
    FacturaPrint3 = document.getElementById("FacturaPrint3")
    Factura = document.getElementById("Factura")
})



ipcRenderer.on('RenderFacturaPrint2', (event, results) =>{
    nom = results[0].NombreCliente
    dateN = results[0].Fecha

    FacturaPrint3
    let template = `
    <h5 id="DirreccionPrint">${results[0].Direccion}</h5>
    <h5 id="FechaPrint">${results[0].NombreCliente}</h5>
    <h5 id="CorreoPrint">${results[0].Email}</h5>
`
    
let comen = `<a>${results[0].Comentario}</a>`
let fac = `<h1>Factura#${results[0].ID_Factura}</h1>`
let dataFac =`
<h5>Rnc: 132046692</h5>
<h5>Fecha: ${results[0].Fecha}</h5>

<h4 style="margin-right: 3%;"> Comprobante: ${results[0].NFC}</h4>
<h4 class="EmpresaPrint" style="margin-right: 3%;">${results[0].Tipo}</h4>`

FacturaPrint3.innerHTML = dataFac
comentarioP.innerHTML = comen
FacturaPrint2.innerHTML = template
Factura.innerHTML = fac


    let template2 = ""
    const list = results
    list.forEach(element =>{
        template2 +=`
        
        <tr>
  <td>${element.Producto}</td>
  <td>${element.Cantidad}</td>
  <td>${element.Precio}</td>
  <td>${element.totalp}</td>
</tr>
`
    });
    mylistPrint.innerHTML = template2;

    let template3 =`<a class="subTil" id="SubTotal">Sub Total</a> <a class="subRes">${results[0].SubTotal}</a>
    <br>
    <a class="subTil">Impuestos</a> <a class="subRes">${results[0].Impuesto}</a>
    <br>
    <a class="subTil">Total</a> <a class="subRes" style="font-size: 20px;">${results[0].Total}</a>
    <br>
    `
    tablaResul.innerHTML = template3

}) 