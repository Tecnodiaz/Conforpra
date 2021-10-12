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

document.addEventListener("DOMContentLoaded", function(){
    Nombre = document.getElementById("Nombre")
    Apellidos = document.getElementById("Apellidos")
    Identidad = document.getElementById("Identidad")
    Telefono = document.getElementById("Telefono")
    Direccion = document.getElementById("Direccion")
    Email = document.getElementById("Email")
    TCliente = document.getElementById("TCliente")
    addCliente = document.getElementById("addCliente")

    addCliente.onclick = function(){
        valorTCliente = TCliente.options[TCliente.selectedIndex].value

        const obj = {Nombre: Nombre.value, Apellidos: Apellidos.value, Identidad: Identidad.value, Telefono: Telefono.value, Direccion: Direccion.value, Email: Email.value, TCliente: valorTCliente}
        ipcRenderer.invoke("addCliente", obj)
    limpiarCliente()
    }
})

function limpiarCliente (){
    Nombre.value = ""
    Apellidos.value =""
    Identidad.value =""
    Telefono.value = ""
    Direccion.value =""
    Email.value =""
}