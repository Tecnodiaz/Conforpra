
let datosEncabezado
let mylistPrint
let tablaResul

let BtnDescargar
let BtnPrint
let nom
let dateN
let comentarioP
document.addEventListener("DOMContentLoaded", function(){
    datosEncabezado = document.getElementById("datosEncabezado")
    mylistPrint =document.getElementById("mylistPrint")    
    tablaResul = document.getElementById("tablaResul")
    BtnPrint = document.getElementById("BtnPrint")
    BtnDescargar = document.getElementById("BtnDescargar")
    comentarioP = document.getElementById("comentarioP")
    BtnDescargar.onclick = function(){
        
        const obj = {nombre : nom, date: dateN}
        CreateDocs(obj)
   }
   BtnPrint.onclick = function(){
    Print()
   }
})

async function CreateDocs(obj){
    ipcRenderer.invoke('CrearDocs', obj)
}
async function Print(){
    ipcRenderer.invoke('Print')
}
    ipcRenderer.on('RenderFacturaPrint', (event, results) =>{
    nom = results[0].Nombre
    dateN = results[0].Fecha
    let template = `
    <h1 id="Factura" class="FacturaPrint">Factura#${results[0].ID_Factura}</h1>
    <h5 id="DirreccionPrint" class="DirreccionPrint">${results[0].Direccion}</h5>
    <h2 id="EmpresaPrint" class="EmpresaPrint">Conforpra</h2>
    <h5 id="FechaPrint" class="FechaPrint">${results[0].NombreCliente}</h5></br>
    <h5 id="CorreoPrint" class="CorreoPrint">${results[0].Email}</h5>
    <h5 class="FechaPrint">Fecha: ${results[0].Fecha}</h5>
    <h4 class="EmpresaPrint" style="margin-right: 3%;"> ${results[0].Tipo}</h4>    
    <h4 class="NFCPrint" style="margin-right: 3%;"> Comprobante: ${results[0].NFC}</h4>`
    
let comen = `<a>${results[0].Comentario}</a>`

comentarioP.innerHTML = comen
datosEncabezado.innerHTML = template

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