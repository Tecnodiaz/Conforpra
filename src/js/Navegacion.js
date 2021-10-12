let Cliente;
let Factura;
let Nfc;
let Reporte;
let Servicios;
let Usuario;
let Venta;
let Menu;
let contenido;
let Titulos;
let Titulos2;
let Titulos3;
let Titulos4;
let Titulos5;
let Titulos6;
let LogoEmpre;

let tablaMenu

let img
let img2
let img3
let img4
let img5
let img6

let ReporteSub
let UsuarioSub

let header

let control1 = false
let login
let nomUsu

let FacturaPrint

document.addEventListener("DOMContentLoaded", function(){
    FacturaPrint = document.getElementById("FacturaPrint")
    nomUsu = document.getElementById("nomUsu")
    header = document.getElementById("header")
    ReporteSub = document.getElementById("ReporteSub")
    UsuarioSub = document.getElementById("UsuarioSub")
    login = document.getElementById("login")
    UsuarioSub.onclick = function(){
        UsuarioView()
    }
    tablaMenu = document.getElementById("tablaMenu")

    Menu = document.getElementById("div1")
    contenido = document.getElementById("div2")
    
    Titulos = document.getElementById("titulMenu")
    Titulos2 = document.getElementById("titulMenu2")
    Titulos3 = document.getElementById("titulMenu3")
    Titulos4 = document.getElementById("titulMenu4")
    Titulos5 = document.getElementById("titulMenu5")
    Titulos6 = document.getElementById("titulMenu6")
    
    LogoEmpre = document.getElementById("LogoEmpre")
    
    img = document.getElementById("iconImg")
    img2 = document.getElementById("iconImg2")
    img3 = document.getElementById("iconImg3")
    img4 = document.getElementById("iconImg4")
    img5 = document.getElementById("iconImg5")
    img6 = document.getElementById("iconImg6")
    


    /**
    if(x == null){
    return false
  }else{
    ReporteSub.style.display = "none"
    UsuarioSub.style.display = "none"
  }
   */
})

let initial = { buscador :""}

function control(){
if(control1 === false){
    ocultar();
}else{
mostrar();
}
}

function mostrar(){

    img.style.width ="13%"
    img2.style.width ="13%"
    img3.style.width ="13%"
    img4.style.width ="13%"
    img5.style.width ="13%"
    img6.style.width ="13%"
    
    
    Menu.style.width = "20%"
    contenido.style.marginLeft = "21%"
    contenido.style.width = "78.6%"
    
    
    Titulos.style.display = "block"
    Titulos2.style.display = "block"
    Titulos3.style.display = "block"
    Titulos4.style.display = "block"
    Titulos5.style.display = "block"
    Titulos6.style.display = "block"
    LogoEmpre.style.display = "block"
    control1 = false
    
}


function ocultar(){
Menu = document.getElementById("div1")
contenido = document.getElementById("div2")

Titulos = document.getElementById("titulMenu")
Titulos2 = document.getElementById("titulMenu2")
Titulos3 = document.getElementById("titulMenu3")
Titulos4 = document.getElementById("titulMenu4")
Titulos5 = document.getElementById("titulMenu5")
Titulos6 = document.getElementById("titulMenu6")

LogoEmpre = document.getElementById("LogoEmpre")

img = document.getElementById("iconImg")
img2 = document.getElementById("iconImg2")
img3 = document.getElementById("iconImg3")
img4 = document.getElementById("iconImg4")
img5 = document.getElementById("iconImg5")
img6 = document.getElementById("iconImg6")

img.style.width ="65%"
img2.style.width ="65%"
img3.style.width ="65%"
img4.style.width ="65%"
img5.style.width ="65%"
img6.style.width ="65%"


Menu.style.width = "5%"
contenido.style.marginLeft = "6%"
contenido.style.width = "93%"

Titulos.style.display = "none"
Titulos2.style.display = "none"
Titulos3.style.display = "none"
Titulos4.style.display = "none"
Titulos5.style.display = "none"
Titulos6.style.display = "none"
LogoEmpre.style.display = "none"

control1 = true

}



function ClienView(){
    Cliente = document.getElementById("Cliente");
    Factura = document.getElementById("Factura");
    Nfc = document.getElementById("NFC");
    Reporte = document.getElementById("Reporte");
    Servicios = document.getElementById("Servicios");
    Usuario = document.getElementById("Usuario");
    Venta = document.getElementById("Ventas");



Cliente.style.display = "block"
Factura.style.display = "none"
Nfc.style.display = "none"
Reporte.style.display = "none" 
Servicios.style.display = "none"
Usuario.style.display = "none"
Venta.style.display = "none"
FacturaPrint.style.display = "none"
let initial = { buscador :""}
renderGetProducts3(initial)
}

function FacturaView(){
    Cliente = document.getElementById("Cliente");
    Factura = document.getElementById("Factura");
    Nfc = document.getElementById("NFC");
    Reporte = document.getElementById("Reporte");
    Servicios = document.getElementById("Servicios");
    Usuario = document.getElementById("Usuario");
    Venta = document.getElementById("Ventas");



Cliente.style.display = "none"
Factura.style.display = "block"
Nfc.style.display = "none"
Reporte.style.display = "none" 
Servicios.style.display = "none"
Usuario.style.display = "none"
Venta.style.display = "none"
FacturaPrint.style.display = "none"

renderGetProducts(initial)

}

function NFCView(){
    Cliente = document.getElementById("Cliente");
    Factura = document.getElementById("Factura");
    Nfc = document.getElementById("NFC");
    Reporte = document.getElementById("Reporte");
    Servicios = document.getElementById("Servicios");
    Usuario = document.getElementById("Usuario");
    Venta = document.getElementById("Ventas");



Cliente.style.display = "none"
Factura.style.display = "none"
Nfc.style.display = "block"
Reporte.style.display = "none" 
Servicios.style.display = "none"
Usuario.style.display = "none"
Venta.style.display = "none"
FacturaPrint.style.display = "none"
renderGetProducts2()

}

function ReporteView(){
    Cliente = document.getElementById("Cliente");
    Factura = document.getElementById("Factura");
    Nfc = document.getElementById("NFC");
    Reporte = document.getElementById("Reporte");
    Servicios = document.getElementById("Servicios");
    Usuario = document.getElementById("Usuario");
    Venta = document.getElementById("Ventas");



Cliente.style.display = "none"
Factura.style.display = "none"
Nfc.style.display = "none"
Reporte.style.display = "block" 
Servicios.style.display = "none"
Usuario.style.display = "none"
Venta.style.display = "none"
FacturaPrint.style.display = "none"
renderGetProducts(initial)
}

function ServiciosView(){
    Cliente = document.getElementById("Cliente");
    Factura = document.getElementById("Factura");
    Nfc = document.getElementById("NFC");
    Reporte = document.getElementById("Reporte");
    Servicios = document.getElementById("Servicios");
    Usuario = document.getElementById("Usuario");
    Venta = document.getElementById("Ventas");



Cliente.style.display = "none"
Factura.style.display = "none"
Nfc.style.display = "none"
Reporte.style.display = "none" 
Servicios.style.display = "block"
Usuario.style.display = "none"
Venta.style.display = "none"
FacturaPrint.style.display = "none"
renderGetProducts6()

}

function UsuarioView(){
    Cliente = document.getElementById("Cliente");
    Factura = document.getElementById("Factura");
    Nfc = document.getElementById("NFC");
    Reporte = document.getElementById("Reporte");
    Servicios = document.getElementById("Servicios");
    Usuario = document.getElementById("Usuario");
    Venta = document.getElementById("Ventas");



Cliente.style.display = "none"
Factura.style.display = "none"
Nfc.style.display = "none"
Reporte.style.display = "none" 
Servicios.style.display = "none"
Usuario.style.display = "block"
Venta.style.display = "none"
FacturaPrint.style.display = "none"
renderGetProducts5()
}

function VentasView(){
    Cliente = document.getElementById("Cliente");
    Factura = document.getElementById("Factura");
    Nfc = document.getElementById("NFC");
    Reporte = document.getElementById("Reporte");
    Servicios = document.getElementById("Servicios");
    Usuario = document.getElementById("Usuario");
    Venta = document.getElementById("Ventas");



Cliente.style.display = "none"
Factura.style.display = "none"
Nfc.style.display = "none"
Reporte.style.display = "none" 
Servicios.style.display = "none"
Usuario.style.display = "none"
Venta.style.display = "block"
FacturaPrint.style.display = "none"
}

function PrintView(){
    Cliente = document.getElementById("Cliente");
    Factura = document.getElementById("Factura");
    Nfc = document.getElementById("NFC");
    Reporte = document.getElementById("Reporte");
    Servicios = document.getElementById("Servicios");
    Usuario = document.getElementById("Usuario");
    Venta = document.getElementById("Ventas");



Cliente.style.display = "none"
Factura.style.display = "none"
Nfc.style.display = "none"
Reporte.style.display = "none" 
Servicios.style.display = "none"
Usuario.style.display = "none"
Venta.style.display = "none"
FacturaPrint.style.display = "block"
}