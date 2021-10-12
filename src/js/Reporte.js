
let mylistReporte;
let FitlrarComprobante;
let FitlrarComprobanteT
let Antes;
let Despues;
let BtnBuscar;
let BtnBorrar;
let sql;
let Monto;

document.addEventListener("DOMContentLoaded", function(){
    mylistReporte = document.getElementById("mylistReporte")
    FitlrarComprobante = document.getElementById("FitlrarComprobante")
    Monto = document.getElementById("Monto")

    Antes = document.getElementById("Antes")
    Despues = document.getElementById("Despues")
    BtnBuscar = document.getElementById("BtnBuscar")
    BtnBorrar = document.getElementById("BtnBorrar")
BtnBorrar.onclick = function(){
    let initialF = { buscador :""}
    renderGetProducts(initialF)
}

    BtnBuscar.onclick = function(){
        FitlrarComprobanteT = FitlrarComprobante.options[FitlrarComprobante.selectedIndex].value
        const obj = {Antes : Antes.value, Despues : Despues.value, Comprobante : FitlrarComprobanteT }


        if(obj.Comprobante == 'Todo' && obj.Antes != '' && obj.Despues != ''){
            sql = `SELECT Factura.ID_Factura, Factura.SubTotal, Factura.Total, Factura.Fecha, Cliente.ID_CLI, Cliente.Nombre, Tipo_Factura.Tipo FROM Factura INNER JOIN Cliente ON Factura.ID_CLI = Cliente.ID_CLI INNER JOIN Tipo_Factura ON Factura.ID_Tipo_Factura = Tipo_Factura.ID_Tipo_Factura WHERE Fecha BETWEEN '${obj.Antes}' AND '${obj.Despues}'`
        }else if(obj.Comprobante == 'Comprobante' && obj.Antes != '' && obj.Despues != '' ){
            sql = `SELECT Factura.ID_Factura, Factura.SubTotal, Factura.Total, Factura.Fecha, Cliente.ID_CLI, Cliente.Nombre, Tipo_Factura.Tipo FROM Factura INNER JOIN Cliente ON Factura.ID_CLI = Cliente.ID_CLI INNER JOIN Tipo_Factura ON Factura.ID_Tipo_Factura = Tipo_Factura.ID_Tipo_Factura WHERE Fecha BETWEEN '${obj.Antes}' AND '${obj.Despues}' AND Factura.ID_NFC IS NOT NULL;`
        }else if(obj.Comprobante == 'Sin Comprobante' && obj.Antes != '' && obj.Despues != ''){
            sql = `SELECT Factura.ID_Factura, Factura.SubTotal, Factura.Total, Factura.Fecha, Cliente.ID_CLI, Cliente.Nombre, Tipo_Factura.Tipo FROM Factura INNER JOIN Cliente ON Factura.ID_CLI = Cliente.ID_CLI INNER JOIN Tipo_Factura ON Factura.ID_Tipo_Factura = Tipo_Factura.ID_Tipo_Factura WHERE Fecha BETWEEN '${obj.Antes}' AND '${obj.Despues}' AND Factura.ID_NFC IS NULL;`
        }else if(obj.Comprobante == 'Todo' && obj.Antes == '' && obj.Despues == ''){
          sql =`SELECT Factura.ID_Factura, Factura.SubTotal, Factura.Total, Factura.Fecha, Cliente.ID_CLI, Cliente.Nombre, Tipo_Factura.Tipo FROM Factura INNER JOIN Cliente ON Factura.ID_CLI = Cliente.ID_CLI INNER JOIN Tipo_Factura ON Factura.ID_Tipo_Factura = Tipo_Factura.ID_Tipo_Factura`
        }else if(obj.Comprobante == 'Comprobante' && obj.Antes == '' && obj.Despues == ''){
            sql = `SELECT Factura.ID_Factura, Factura.SubTotal, Factura.Total, Factura.Fecha, Cliente.ID_CLI, Cliente.Nombre, Tipo_Factura.Tipo FROM Factura INNER JOIN Cliente ON Factura.ID_CLI = Cliente.ID_CLI INNER JOIN Tipo_Factura ON Factura.ID_Tipo_Factura = Tipo_Factura.ID_Tipo_Factura WHERE Factura.ID_NFC IS NOT NULL;`
        }else if(obj.Comprobante == 'Sin Comprobante' && obj.Antes == '' && obj.Despues == ''){
            sql = `SELECT Factura.ID_Factura, Factura.SubTotal, Factura.Total, Factura.Fecha, Cliente.ID_CLI, Cliente.Nombre, Tipo_Factura.Tipo FROM Factura INNER JOIN Cliente ON Factura.ID_CLI = Cliente.ID_CLI INNER JOIN Tipo_Factura ON Factura.ID_Tipo_Factura = Tipo_Factura.ID_Tipo_Factura WHERE Factura.ID_NFC IS NULL;`
        }

        ipcRenderer.invoke("GetFacturaFill", sql)
    }
})


ipcRenderer.on('RenderFacturaFill', (event, results) => {
    let template = ""

/*
    let total = results[0].Total 
for(i=1; i<results.length; i++){
total = total + results[i].Total
}

    let template4 =`  <p>Total</p>
<p class="dinero">$${total}</p>`

Monto.innerHTML = template4
*/
    const list = results


    list.forEach(element =>{
        template += `
        <tr>
        <td>${element.ID_Factura}</td>
        <td>${element.Nombre}</td>
        <td>${element.Fecha}</td>
        <td>${element.Total}</td>
        <td><a>Ver Factura<a></td>
      </tr>  `
    })
    mylistReporte.innerHTML = template;
})

ipcRenderer.on('RenderFacturas', (event, results) => {
    let template = ""

/*let total = results[0].Total 
for(i=1; i<results.length; i++){
total = total + results[i].Total
}

    let template4 =`  <p>Total</p>
<p class="dinero">$${total}</p>`

Monto.innerHTML = template4
*/  
const list = results
    list.forEach(element =>{
        template += `
        <tr>
        <td>${element.ID_Factura}</td>
        <td>${element.Nombre}</td>
        <td>${element.Fecha}</td>
        <td>${element.Total}</td>
        <td onclick="VerFac2(${element.ID_Factura})"><a>Ver Documentos<a></td>
        </tr>      </tr>  `
    })
    mylistReporte.innerHTML = template;
})

async function VerFac2(obj){
    PrintView()
    ipcRenderer.invoke('VerFacturas', obj)

}
