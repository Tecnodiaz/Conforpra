const { ipcRenderer } = require("electron")

let FacturaPrint2
let mylistPrint
let tablaResul
let Factura2
let comentarioP
let FacturaPrint3


document.addEventListener("DOMContentLoaded", function(){
    FacturaPrint2 = document.getElementById("FacturaPrint2")
    mylistPrint =document.getElementById("mylistPrint")    
    tablaResul = document.getElementById("tablaResul")
    comentarioP = document.getElementById("comentarioP")
    FacturaPrint3 = document.getElementById("FacturaPrint3")
    Factura2 = document.getElementById("FacturaTitle")   
    
})
ipcRenderer.on('RenderFacturaPrint2', (event, results) =>{
    nom = results[0].NombreCliente
    dateN = results[0].ID_Factura
    console.log(results)

    let template = `

    <h6 id="FechaPrint" class="sinMargen"><b>${results[0].ID_CLI}-${results[0].NombreCliente} ${results[0].Apellidos}</b></h6>
    <h6 class="sinMargen" >RNC/C.I: ${results[0].Identidad}</h6>
    <h6 class="sinMargen" >Telefono: ${results[0].Telefono}</h6>
    <h6 id="DirreccionPrint" class="sinMargen" >${results[0].Direccion}</h6>
    <h6 id="CorreoPrint" class="sinMargen" >${results[0].Email}</h6>
`
    
let fac = `<h1>Factura#${results[0].ID_Factura}</h1>`
let dataFac =`
<h6 class="sinMargen" >Direccion: Juan Sánchez Ramírez 56, Santo Domingo Zona Universitaria.</h6>
<h6 class="sinMargen" >Fecha: ${results[0].Fecha}</h6>
<h6 class="sinMargen" >Rnc: 132046692</h6>
<h6 class="sinMargen" >Telefono: (809)-908-4443</h6>
<h6 class="sinMargen" >Correo: servicios@conforpra.com.do</h6>

<h5 style="margin-right: 3%;"> Comprobante: ${results[0].NFC}</h5>
<h5 class="EmpresaPrint" style="margin-right: 3%;">${results[0].Tipo}</h5>`

FacturaPrint3.innerHTML = dataFac
FacturaPrint2.innerHTML = template
Factura2.innerHTML = fac


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

    let template3 =`<a class="subTil" id="SubTotal">SubTotal: ${results[0].SubTotal}</a>
    <br>
    <a class="subTil">Impuestos: ${results[0].Impuesto}</a>
    <br>
    <a class="subTil">Total: ${results[0].Total}</a>
    <br>
    `
    tablaResul.innerHTML = template3

}) 