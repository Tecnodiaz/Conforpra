let renderCampos
let clientesDataList
let select
let option
let mylistVentas
let comprobanteVentas
let titulosVentas
let DatalistVenta
let TotalObj

let tdNuevo;
let AgregarLinea;
let contador = 1
let BtnGuardar
let BtnCancelar

let SubTotal
let inputCliente
let ArticuloId
let CantidadTabla
let PrecioTabla
let Comentario
let Impuesto

let BtnActualizar
let Idnew
let EliminarLinea

let a;
let porciento
let defaul
let Venta2

let tdNew;
let tdNewCopy
let Eli

document.addEventListener("DOMContentLoaded", function(){
    renderCampos = document.getElementById("renderCampos")
    mylistVentas = document.getElementById("mylistVentas")
    renderCamposnew()
    Eli = document.getElementsByName("Eli")

    DatalistVenta = document.getElementById("DatalistVenta")
    Impuesto = document.getElementById("Impuesto")
    BtnCancelar = document.getElementById("BtnCancelar")
Comentario = document.getElementById("Comentario")
//document.getElementById("Ventas");
    EliminarLinea = document.getElementById("EliminarLinea")
    SubTotal = document.getElementById("SubTotal")
    inputCliente = document.getElementById("inputCliente")
    BtnActualizar = document.getElementById("BtnActualizar")

    titulosVentas = document.getElementById("titulosVentas")
    clientesDataList = document.getElementById("clientesDataList")
    AgregarLinea = document.getElementById("AgregarLinea")
    tdNuevo = document.getElementById("tdNuevo")
    BtnGuardar = document.getElementById("BtnGuardar")
    Idnew = document.getElementsByName("Idnew")
    ArticuloId = document.getElementsByName("ArticuloId")
    CantidadTabla = document.getElementsByName("CantidadTabla")
    PrecioTabla = document.getElementsByName("PrecioTabla")
    Comentario.value = "Gracias por su compra"
    



console.log(tdNuevo)

  BtnCancelar.onclick = function(){
      LimpiarCamposVentas()
    Venta.style.display = "none"
    Factura.style.display = "block"      
}

BtnActualizar.onclick = function(){
    option2 = comprobanteVentas.options[comprobanteVentas.selectedIndex].value;

    let Impues
if (Impuesto.checked == true) {
Impues = Impuesto.value
}else{
Impues = 0
}
    let CantidadObj = []

    for(i=0;i<contador;i++){
        CantidadObj[i] = {TotalFila : CantidadTabla[i].value * PrecioTabla[i].value};
        CantidadObj.push(CantidadObj[i])
    };
    delete CantidadObj[contador]
    let array =[]
    let template =""
    const list = CantidadObj
    list.forEach(element =>{
     array.push({ s: template = `<a>${element.TotalFila}</a>`})
    });

    delete array[contador+1]
    for(i=0;i<contador;i++){
        Idnew[i].innerHTML = array[i].s;
    };
let r = CantidadObj.length-1

    if(r == 1){   
        TotalObj = CantidadObj
        a = CantidadObj[0].TotalFila
        
        if(Impues != 1){
            porciento = 0
        }else{
            porciento = CantidadObj[0].TotalFila *0.18 

        }

        let template = `<a class="subTil" id="SubTotal">Sub Total</a> <a class="subRes">${a}</a>
        <br>
        <a class="subTil">Impuestos</a> <a class="subRes">${porciento}</a>
        <br>
        <a class="subTil">Total</a> <a class="subRes" style="font-size: 30px;">${ a + porciento}</a>
        <br>
        `

        tablaMenu.innerHTML = template

}else{
console.log('ejecuta')

TotalObj = CantidadObj

a = CantidadObj[0].TotalFila;         

for(i=1;i<contador;i++){

a = a + CantidadObj[i].TotalFila
console.log(option2)
if(Impues != 1){
    porciento = 0
}else{
porciento = a*0.18 

}
};

let template = `<a class="subTil" id="SubTotal">Sub Total</a> <a class="subRes">${a}</a>
<br>
<a class="subTil">Impuestos</a> <a class="subRes">${porciento}</a>
<br>
<a class="subTil">Total</a> <a class="subRes" style="font-size: 30px;">${ a + porciento}</a>
<br>
`

tablaMenu.innerHTML = template

}
/**
*/
}

    let date = new Date()
    let day = date.getDate();   
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let completa = `${year}/${month}/${day}`
    titulosVentas.value = completa

    renderGetProducts9()

    comprobanteVentas = document.getElementById("comprobanteVentas")

    select = document.getElementById("Cotizacion")
    option = select.options[select.selectedIndex].value;
    visible( option, comprobanteVentas)


    BtnGuardar.onclick = function(){
        option2 = comprobanteVentas.options[comprobanteVentas.selectedIndex].value;

    let Campos = [];
    ArticuloId = document.getElementsByName("ArticuloId")
    CantidadTabla = document.getElementsByName("CantidadTabla")
    PrecioTabla = document.getElementsByName("PrecioTabla")
    arti = ArticuloId.length -1

    for(i=0;i<arti;i++){
        Campos[i] = {IdCampos : ArticuloId[i].value, CantidadTabla: CantidadTabla[i].value, PrecioTabla: PrecioTabla[i].value };

        Campos.push(Campos[i])
    };
   
   let IdCamposObj = []


    for(i=0;i<arti +1 ;i++){
        IdCamposObj[i] = {IdCampos : ArticuloId[i].value};
        IdCamposObj.push(IdCamposObj[i])
    };
    delete IdCamposObj[arti+1]


    let CantidadObj = []

    for(i=0;i<arti +1;i++){
        CantidadObj[i] = {Cantidad : CantidadTabla[i].value};
        CantidadObj.push(CantidadObj[i])
    };
    delete CantidadObj[arti+1]


    let PrecioTablaObj = []

    for(i=0;i<arti +1;i++){
        PrecioTablaObj[i] = {Precio : PrecioTabla[i].value};
        PrecioTablaObj.push(PrecioTablaObj[i])
    };
    delete PrecioTablaObj[arti+1]
    const obj = { Cliente2: inputCliente.value, Tipo: option, Comprobante: option2, Fecha : titulosVentas.value, Articulo :  IdCamposObj, Cantidad : CantidadObj, Precio : PrecioTablaObj }
    
console.log(option2)

    if(obj.Comprobante != "NULL"){

    
        ObtenerComprobante()
    
        ipcRenderer.on('RenderComprobante', (event, results)=>{

    enviar(results[0].ID_NFC, obj)
        })

    }else{
        EnviarFactura(obj)
     
    }


}


select.onclick = function(){
    option = select.options[select.selectedIndex].value;
    visible( option, comprobanteVentas)
}

AgregarLinea.onclick = function(){
clonar()
}
EliminarLinea.onclick = function(){
    deleteClon()
}

})

async function ObtenerComprobante(){
    await ipcRenderer.invoke('GetComprobante')
}

function renderCamposnew(){

    let template4 = `
    <tr id = "mylistVentas0">
<td id="tdNuevo">
    <input list="DatalistVenta" type="text" class="inputComunes" style="width: 100%; height: 60%" name="ArticuloId" required>

    <datalist id="DatalistVenta">
    </datalist>
    
  </td>
    
    <td><input type="number" type="text" class="inputComunes" style="width: 60%; height: 50%; margin-left: 18%" name="CantidadTabla" required></td>
    
    <td>
     <input type="number" type="text" class="inputComunes" style="width: 60%; height: 50%; margin-left: 18%" name="PrecioTabla" required>
  </td>

  <td>
  <a name="Idnew" ><a>
 </td>

 <td id="BTNEL0" onclick="buscarIdt(this.id)" name ="Eli">Eliminar</td>
 
 </tr>
`

    renderCampos.innerHTML = template4
}

function buscarIdt(id){
    const ids =  document.getElementById(`${id}`).parentNode;
  let ne = ids.id
  console.log( ids)
    deleteClon(ne)
}

function buscarIdtClean(id){
    const ids =  document.getElementById(`${id}`).parentNode;
  let ne = ids.id
  console.log( ids)
    deleteClonClean(ne)
}

async function EnviarFactura(obj){
 
    //const obj = { Cliente: inputCliente.value, Tipo: option, Comprobante: option2, Fecha : titulosVentas.value, Articulo :  IdCamposObj, Cantidad : CantidadObj, Precio : PrecioTablaObj }
    let totalcomentario = Comentario.value
    let sql2 ='INSERT INTO `Factura` (`ID_NFC`, `ID_CLI`, `ID_usu`, `ID_Tipo_Factura`, `SubTotal`, `Impuesto`,`Comentario` ,`Total`, `Fecha`)'
    
    let values2 = `VALUES ( ${obj.Comprobante}, ${obj.Cliente2}, ${idUsu}, ${obj.Tipo}, ${a}, ${porciento},'${totalcomentario}',${a + porciento},'${titulosVentas.value}')`
    
    let sqlFactura = `${sql2}${values2}`


    let sql = 'INSERT INTO `Detalles_Factura` (`Precio` ,`Total`, `ID_Producto`, `ID_Factura`, `Cantidad`)'

let sqlDetalles = sql + ` VALUES (${obj.Precio[0].Precio},${TotalObj[0].TotalFila} ,${obj.Articulo[0].IdCampos}, (select Factura.ID_Factura from Factura order by ID_Factura desc limit 1), ${obj.Cantidad[0].Cantidad})`



    let queryF
    let values
    let valuesTotal
    let sql3 = sqlDetalles
    for(i=1;i<contador;i++){

       values = (`,(${obj.Precio[i].Precio},${TotalObj[i].TotalFila} ,${obj.Articulo[i].IdCampos}, (select Factura.ID_Factura from Factura order by ID_Factura desc limit 1),${obj.Cantidad[i].Cantidad})`
       )
    sql3 = sql3 + values
        sql3 = sql3
    }
    
    console.log(sqlFactura)
console.log(sql3)
agregarFactura(sqlFactura, sql3)

// await ipcRenderer.invoke('SendFactura')
}   
async function agregarFactura (objFactura, objDetalles){
    PrintView()
    await ipcRenderer.invoke('SendFactura', objFactura, objDetalles)
}

let i = 0

function clonar(){
let r = 0

let original = document.getElementById("mylistVentas" +r)
let clone = original.cloneNode(true);
i++
clone.id = "mylistVentas" + i;
clone.childNodes[9].id = "BTNEL" + i;



    original.parentNode.appendChild(clone);

   contador = contador + 1


}

    

function deleteClon(id){
let elEliminado = document.getElementById(`${id}`)    
if (id === 'mylistVentas0'){
    alert("No puede eliminar el primero")
}else{
    elEliminado.remove()
}
/*
   //  let tdSelect = Idnew[id]
   let aarr= renderCampos.childNodes
//para que es aarr

   let arr = Array.from(aarr)
   console.log(arr)

let eli = arr.findIndex(element => element.id === id )

console.log(arr)       
//renderCampos[eli].remove()
*/
contador = contador - 1
}


function deleteClonClean(id){
    let elEliminado = document.getElementById(`${id}`)    
    if (id === 'mylistVentas0'){
        alert("No puede eliminar el primero")
    }else{
        elEliminado.remove()
    }
    /*
       //  let tdSelect = Idnew[id]
       let aarr= renderCampos.childNodes
    //para que es aarr
    
       let arr = Array.from(aarr)
       console.log(arr)
    
    let eli = arr.findIndex(element => element.id === id )
    
    console.log(arr)       
    //renderCampos[eli].remove()
    */
    }

function enviar(results, obj){

    obj.Comprobante = results
 
        EnviarFactura(obj)
    }

async function renderGetProducts9(){
   ipcRenderer.invoke('GetServicios')
}
ipcRenderer.on('RenderServicios',(event, results) =>{

    let template =""
    const list = results
    list.forEach(element =>{
        template +=`
        <option value="${element.ID_Producto}" label="${element.Producto}" id="productoIdVenta">${element.Producto}</option>
        `
    });
    DatalistVenta.innerHTML = template;
})

function visible(valor, ocultado){

    if( valor == 2){
        ocultado.style.display = "none"
        comprobanteVentas.value="NULL"
    }else{
        ocultado.style.display = "block"
    }

}

ipcRenderer.on('RenderCliente', (event, results) =>{
    let template = ""
    const list = results
    list.forEach(element =>{
        template +=`
    '<option value="${element.ID_CLI}" label="${element.Nombre}">${element.Nombre}</option>'
        `
    })

    clientesDataList.innerHTML = template;
})

function LimpiarCamposVentas(){
    inputCliente.value=""
    select.value='2'
    option = select.options[select.selectedIndex].value;
    visible( option, comprobanteVentas)
    Impuesto.checked = false

    if(contador > 1 ){
        let i = document.getElementsByName("Eli")
        
for (let index = 1; index < contador; index++) {
    let w = i[1].id
            console.log(w)
            buscarIdtClean(w)
        }/*}else{
    console.log("No pasa nada")*/
}
}