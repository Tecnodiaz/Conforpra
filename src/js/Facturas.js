
let mylistFac;
let btnFindF
let searchF

document.addEventListener("DOMContentLoaded", function(){

    
    let initialF = { buscador :""}
    searchF = document.getElementById("searchF")
    btnFindF = document.getElementById("btnFindF")
    mylistFac = document.getElementById("mylistFac")
    renderGetProducts(initialF)
    btnFindF.onclick = function(){
        const valor = searchF.value
        const obj = {buscador: `${valor}`}
        renderGetProducts(obj)
    }

})


async function renderGetProducts(obj){
    ipcRenderer.invoke('GetFacturas', obj)
}


function renderizadoF(results, obj){
    let template =""
    const list = results

const filtro =[]


for(let result of list){
    let Nombre = result.Nombre.toLowerCase();
    let Buscador = obj.buscador.toLowerCase();
    if(Nombre.indexOf(Buscador) != -1) {
    filtro.push(result);

    }
}
    filtro.forEach(element =>{
        template +=`
        
        <tr>
  <td>${element.ID_Factura}</td>
  <td>${element.Nombre}</td>
  <td>${element.Fecha}</td>
  <td>${element.Total}</td>
 <td>${element.Tipo}</td>
  <td onclick="VerFac(${element.ID_Factura})"><a>Ver Documentos<a></td>
</tr>
`
    });
    mylistFac.innerHTML = template;
}

ipcRenderer.on('RenderFacturas',(event, results, obj) =>{

renderizadoF(results, obj)

})

async function VerFac(obj){
    PrintView()
    ipcRenderer.invoke('VerFacturas', obj)

}


function cerrarSesion(){
    header.style.display ="none"
    Menu.style.display ="none"
    contenido.style.display ="none"
    login.style.display = "block"
    loginUsuario.value = ""
    loginPass.value = ""
}