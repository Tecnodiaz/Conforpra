let mylistCliente;
let OpenForm;
let brnFind
let ListaClientes
let searchC;

document.addEventListener("DOMContentLoaded", function(){
  let initial = { buscador :""}
  searchC = document.getElementById("searchC")
    brnFind = document.getElementById("brnFind")
    mylistCliente = document.getElementById("mylistCliente")
    OpenForm = document.getElementById("OpenForm")

    renderGetProducts3(initial)
    OpenForm.onclick = function(){
ipcRenderer.invoke("OpenForm")
    }

    

    brnFind.onclick = function(){
        const valor = searchC.value
        const obj = {buscador: `${valor}`}
        renderGetProducts3(obj)
    }

})

async function renderGetProducts3(obj) {
    await ipcRenderer.invoke('GetCliente', obj)
}


function filtrarCliente(results){
    if('Nombre' in results && results.Nombre == "D") {
        return true;
    }else{
        console.log('no son validos')
    return false
    }
}

const renderizando =(results, obj)=>{
    let template = ""
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
        <td>${element.ID_CLI}</td>
        <td>${element.Nombre}</td>
        <td>${element.Apellidos}</td>
        <td>${element.Identidad}</td>
        <td>${element.Telefono}</td>
        <td>${element.Direccion}</td>
        <td>${element.Email}</td>
        <td>${element.Tipo_cliente}</td>
        </tr>
        `
    })
    mylistCliente.innerHTML = template;
}

ipcRenderer.on('RenderCliente', (event, results, obj) =>{

    renderizando(results, obj)

})