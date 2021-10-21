const { ipcRenderer } = require("electron")

let Nombre
let Apellidos
let Identidad
let Telefono
let Direccion
let Email
let TCliente
let addCliente
let valorTCliente

let Hide
let estul
let editingStatus = false;
let editProductId;

document.addEventListener("DOMContentLoaded", function(){
    Hide = document.getElementById("Hide")
    Nombre = document.getElementById("Nombre")
    Apellidos = document.getElementById("Apellidos")
    Identidad = document.getElementById("Identidad")
    Telefono = document.getElementById("Telefono")
    Direccion = document.getElementById("Direccion")
    Email = document.getElementById("Email")
    TCliente = document.getElementById("TCliente")
    addCliente = document.getElementById("addCliente")

    Hide.onclick = function(){
        ipcRenderer.invoke("cancelarList")    
        editingStatus = false
    }

    addCliente.onclick = function(){
        valorTCliente = TCliente.options[TCliente.selectedIndex].value

        const obj = {Nombre: Nombre.value, Apellidos: Apellidos.value, Identidad: Identidad.value, Telefono: Telefono.value, Direccion: Direccion.value, Email: Email.value, ID_Tipo_CLI: valorTCliente}

if(editingStatus == false){

        ipcRenderer.invoke("addCliente", obj)
    }else {
        ipcRenderer.invoke("UpdateCli", obj, editProductId)
        editingStatus = false
    }
    
    
    limpiarCliente()
    }
    ipcRenderer.on('EditCliente', (event, results) =>{
        console.log(results)
          editingStatus = true;
          estul = results
      
          Nombre.value = results[0].Nombre
          Apellidos.value = results[0].Apellidos
          Identidad.value = results[0].Identidad
          Telefono.value = results[0].Telefono
          Direccion.value = results[0].Direccion
          Email.value = results[0].Email
          TCliente.value = results[0].ID_Tipo_CLI
        
          editProductId = results[0].ID_CLI;
      })
})


function limpiarCliente (){
    Nombre.value = ""
    Apellidos.value =""
    Identidad.value =""
    Telefono.value = ""
    Direccion.value =""
    Email.value =""
}

