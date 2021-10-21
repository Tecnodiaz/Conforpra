
let mylistServicios;
let NombreProduc
let DescripcionProduc
let PrecioProduc
let TipoServicio
let valorServicioT
let BtnAgregarProduc;
let TipoProduc;

document.addEventListener("DOMContentLoaded", function(){
    mylistServicios = document.getElementById("mylistServicios")
    NombreProduc = document.getElementById("NombreProduc")
    DescripcionProduc = document.getElementById("DescripcionProduc")
    PrecioProduc = document.getElementById("PrecioProduc")
    TipoServicio = document.getElementById("TipoServicio")
    valorServicioT = document.getElementById
    BtnAgregarProduc = document.getElementById("BtnAgregarProduc")
    renderGetProducts6()

    BtnAgregarProduc.onclick = function(){

        TipoProduc = TipoServicio.options[TipoServicio.selectedIndex].value;

        const obj = { Nombre : NombreProduc.value, DescripcionProduc: DescripcionProduc.value, Precio: PrecioProduc.value, TipoProduc: TipoProduc}
console.log(obj)
        ipcRenderer.invoke("addProducto", obj)
        limpiarServicios()
    }
})

function limpiarServicios () {
    NombreProduc.value =""
    DescripcionProduc.value = ""
    PrecioProduc.value =""
}
function EliminarProductos(id){
    ipcRenderer.invoke('EliminarProducto', id)
}

async function renderGetProducts6(){
    ipcRenderer.invoke('GetServicios')
}

ipcRenderer.on('RenderServicios',(event, results) =>{
    let template =""
    const list = results
    list.forEach(element =>{
        template +=`
        
 
        <tr>
        <td>${element.ID_Producto}</td>
  <td>${element.Producto}</td>
  <td>${element.Descripcion}</td>
  <td>$${element.Precio}</td>
  <td>${element.Nombre}</td>
  <td onclick = "EliminarProductos(${element.ID_Producto})" >Eliminar</td>
  </tr>
`
    });
    mylistServicios.innerHTML = template;
})
