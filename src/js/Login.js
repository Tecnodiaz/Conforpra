const {ipcRenderer} = require('electron')

let loginUsuario
let loginPass;
let btnLogin;
let idUsu;

document.addEventListener("DOMContentLoaded", function(){

    loginUsuario = document.getElementById('UsuarioT');
    
    loginPass = document.getElementById('Password');

    btnLogin = document.getElementById('botonIniciar');

    btnLogin.onclick = function(){

const validacion = 
{ usuario : loginUsuario.value,
     contraseña: loginPass.value};
    
     ipcRenderer.invoke('login', validacion);
    }
})

ipcRenderer.on('RenderLogin', (event, results) =>{
  
if (results.length !== 0) {
    idUsu = results[0].ID_Usu


let html = `<img src="../asset/img/menu (1).png" class="menuLogo" onclick="control()">
<img src="../asset/img/cerrar-sesion (1).png" alt="" class="cerrarSesion" onclick="cerrarSesion()">
<h6 class="nomUsu" id="nomUsu">${results[0].Nombre}</h6>`

header.innerHTML = html




if(results[0].Nivel == 1){
  
        login.style.display = "none"
    header.style.display ="block"
    Menu.style.display ="block"
    contenido.style.display ="block"

}else{

login.style.display = "none"
header.style.display ="block"
Menu.style.display ="block"
ReporteSub.style.display = "none"
UsuarioSub.style.display = "none"
contenido.style.display ="block"

}
}else{
    alert("Usted no tiene acceso")
}

})