
let mylistUsuario;
let User;
let Contraseña;
let NombreUsu;
let AddUsuario;

document.addEventListener("DOMContentLoaded", function(){

    mylistUsuario = document.getElementById("mylistUsuario")    
    AddUsuario = document.getElementById("AddUsuario")
    User = document.getElementById("User")
    Contraseña = document.getElementById("Contraseña")
    NombreUsu = document.getElementById("NombreUsu")
    
    renderGetProducts5()

AddUsuario.onclick = function(){
const obj = { User: User.value ,Contraseña: Contraseña.value,  Nombre: NombreUsu.value}
    ipcRenderer.invoke( 'addUserH', obj)
limpiarUsuario()
}

    
})

function limpiarUsuario(){
    User.value = ""
    Contraseña.value = ""
    NombreUsu.value = ""
}

async function renderGetProducts5(){
    ipcRenderer.invoke('GetUsuario')
}

ipcRenderer.on('RenderUsuario',(event, results) =>{
    let template =""
    const list = results
    list.forEach(element =>{
        template +=`
        
        <tr>
  <td onclick="DeleteUse(${element.ID_Usu})">Eliminar</td>
  <td>${element.Nom_Usuario}</td>
  <td>${element.Contraseña}</td>

</tr>
`
    });
    mylistUsuario.innerHTML = template;
})

function DeleteUse (obj){
   ipcRenderer.invoke('deleteUsuario', obj)
}
