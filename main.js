const { getconexion } = require ('./database');
const electron = require('electron')
const {webContents} = electron.webContents
const {Notification} = require('electron')
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const fs = require('fs')
const os = require('os')
const path = require('path');
const { default: axios } = require('axios');
const shell = electron.shell

let WinFom;
let win;
let winPrint;


function createWindowPrint(){
    winPrint = new BrowserWindow({
       webPreferences: {
           nodeIntegration: true,
           enableRemoteModule: true,
           contextIsolation: false
       }
   })
   winPrint.loadFile('src/views/Login.html')
winPrint.on("closed", ()=>{
    winPrint = undefined;
})   
}
function cancelarList(){
    WinFom.hide()
}


function createFormulario(){
    WinFom = new BrowserWindow({
width:430,
height: 900,
resizable: false,
frame: false,
webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    })
   WinFom.setMenu(null)

    WinFom.loadFile('src/views/formulario.html')
};


function createWindow(){
 win = new BrowserWindow({
width:1600,
height: 900,
    webPreferences: {
        resizable: false,
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false
    }
})
createWindowPrint()
createFormulario()

win.loadFile('src/views/Facturas.html')
//win.setMenu(null)

//winPrint.hide()
//WinFom.hide()

win.on("closed", ()=>{
    winPrint.close()
    WinFom.close()
})

}

    ipcMain.handle('GetNFC', (event) =>{
        getNFC()
    })

    ipcMain.handle('OpenForm', (event) =>{
        open()
    })

ipcMain.handle('GetFacturas', (event, obj) =>{
    console.log(obj)
    getFactura(obj)
})

ipcMain.handle('GetFacturaFill', (event, obj) =>{
    console.log(obj)
    getFacturaFilt(obj)
})

ipcMain.handle('UpdateCli', (event, obj, id) =>{
    UpdateCli(obj, id)
})

ipcMain.handle('GetComprobante', (event) =>{
    getComprobante()
})

ipcMain.handle('cancelarList', (event) =>{
    cancelarList()
})

ipcMain.handle('SendFactura', (event, objFactura, objDetalles) =>{
    sendFactura(objFactura)
    detalleSFactura(objDetalles)
    getFacturaIndividual()
})

ipcMain.handle('VerFacturas', (event, obj)=>{
    getfactunf(obj)
})

ipcMain.handle('GetServicios', (event) =>{
    getServicios()
})


ipcMain.handle('GetUsuario', (event)=>{
    getUsuario()
})

ipcMain.handle('deleteUsuario', (event, obj)=>{
    deleteUsuario(obj)
})

ipcMain.handle('GetCliente', (event, obj) =>{
    getCliente(obj)
})

ipcMain.handle('ModificarCli', (event, id) =>{
    ModificarCli(id)
})

ipcMain.handle('addUserH', (event, obj) =>{
    addUser(obj)
})

ipcMain.handle('addCliente', (event, obj) =>{
    addCliente(obj)
})

ipcMain.handle('addNFC', (event, obj) =>{
    addNFC(obj)
})

ipcMain.handle('addProducto', (event, obj) =>{
    addProducto(obj)
})

ipcMain.handle('CrearDocs', (event, obj) =>{
console.log(obj)
    crearDocs(obj)
})

ipcMain.handle('Print', (event) =>{
        Print()
    })

ipcMain.handle('EliminarNFC', (event, id) =>{
    EliminarNFC(id)
    })

    ipcMain.handle('EliminarProducto', (event, id) =>{
        EliminarProductos(id)
    })

ipcMain.handle('OpenPrint', (event) =>{
    winPrint.show()
 })

ipcMain.handle('login', (event, obj) => {
    validarlogin(obj);
 })


 const validarlogin = (obj) =>  {

    let usu = obj.usuario;
    let con = obj.contraseña;

axios.get(`http://localhost:3000/api/users/validar/${usu}/${con}`).then(function (response) {
    // handle success
    console.log(response.data)
    win.webContents.send('RenderLogin', response.data);
   
  }).catch(function (error) {
    // handle error
    console.log(error);
  })


 

 }

function EliminarNFC(id){

axios.put(`http://localhost:3000/api/nfc/Eliminar/${id}`).then(function(response){
    console.log(response.data)
}).catch(function(error){  console.log(error) }).then(function(){

    getNFC()
})

 }

  function addNFC (obj){
    axios.post('http://localhost:3000/api/nfc',
        {NFC:obj.Nfc,Estatus:obj.Estatus} ).then(function (response) {
            console.log(response);
           
          }).catch(function (error) {
            console.log(error);
          }).then(function () {
            // always executed
            getNFC()
          });
        
}

function getNFC(){

    axios.get("http://localhost:3000/api/nfc").then(function(response){
        console.log(response.data)
        win.webContents.send('RenderNfc', response.data);
    }).catch(function(error){
    console.log(error)
})
}




function crearDocs(obj){
    console.log(obj)
        // Use default printing options
        winPrint.webContents.printToPDF({}).then(data => {
          const pdfPath = path.join(os.homedir(), 'Escritorio', `'${obj.nombre}${obj.date}.pdf'`)
          fs.writeFile(pdfPath, data, (error) => {
            if (error) throw error
            new Notification({
                title: "ConforpraTech",
                body: `Wrote PDF successfully to ${pdfPath}`
            }).show()
          })
        }).catch(error => {
            new Notification({
                title: "ConforpraTech",
                body: `Failed to write PDF to ${pdfPath}: `
            }).show()
        })
      }
   


function open(){
    WinFom.show()
}



 function addProducto (obj){
  
        axios.post('http://localhost:3000/api/productos',
        {Producto:obj.Nombre, Descripcion:obj.DescripcionProduc,Precio:obj.precio,ID_Tipo_Producto:obj.TipoProduc} ).then(function (response) {
            // handle success
            console.log(response);
          }).catch(function (error) {
            // handle error
            console.log(error);
          }).then(function () {
            // always executed
            getServicios()
          });
   
  
        
}

 function getServicios(){

    
        axios.get("http://localhost:3000/api/servicios").then(function (response) {
            // handle success
            console.log(response.data)
    win.webContents.send('RenderServicios', response.data);    
          }).catch(function (error) {
            // handle error
            console.log(error);
          })
       


}


function EliminarProductos(id){
 axios.put(`http://localhost:3000/api/servicios/${id}`).then(function(response){
    console.log(response.data) 
}).catch(function(error){
    getServicios()
})
} 


function getComprobante() {

axios.get("http://localhost:3000/api/facturas/nfc").then(function(response){
    console.log(response.data)
    win.webContents.send('RenderComprobante', response.data)    

}).catch(function(error){
        console.log(error)
    })
    
}

function sendFactura(objFactura) {

axios.post("http://localhost:3000/api/facturas/send",{objFactura: objFactura}).then(function(response){
    console.log(response)
}).catch (function (error) {
    console.log(error)
}).then(function(){
    let initial = { buscador :""}

    getFactura(initial)
    
})

}

function detalleSFactura(objDetalles) {
axios.post("http://localhost:3000/api/facturas/send/detalles",{objDetalles: objDetalles}).then(function(response){
    console.log(response)  
}).catch (function(error) {
    console.log(error)
})

}
 function getFacturaIndividual(){

    
         axios.get("http://localhost:3000/api/facturas/detalles").then(function (response) {
            // handle success
            console.log(response.data)
            presentarDatos(response.data)
            
          }).catch(function (error) {
            // handle error
            console.log(error);
          }).then(function () {
            // always executed
            let initial = { buscador :""}
   
            getFactura(initial)
          });
        



}

 function getfactunf(obj){
    
    
     axios.get(`http://localhost:3000/api/facturas/${obj}`).then(function(response){
        console.log(response.data)
        presentarDatos(response.data) 
     }).catch(function (error) {
        // handle error
        console.log(error);
    }).then(function () {
        let initial = { buscador :""}
   
        getFactura(initial) 
      });
   

}

function getFactura(obj){

    
        axios.get(`http://localhost:3000/api/facturas`).then(function(response){
            console.log(response.data)
            win.webContents.send('RenderFacturas', response.data, obj);                
        }).catch(function(error) {
        console.log(error)
    })

}


 function getFacturaFilt(obj){
    
     axios.get(`http://localhost:3000/api/facturas/send/${obj}`).then(function (response) {
        // handle success
        console.log(response.data)
        win.webContents.send('RenderFacturaFill', response.data);
    
      }).catch(function (error) {
        // handle error
        console.log(error);
      })
  

}

function presentarDatos(obj){
    const db = await getconexion()
    console.log(obj[0].ID_Factura)
    console.log(obj[0].ID_NFC)
    if(obj[0].ID_NFC == null){

    axios.get(`http://localhost:3000/api/facturas/mostrar/${[obj[0].ID_Factura]}`).then(function(response){
        console.log(response.data)
        winPrint.webContents.send('RenderFacturaPrint2', response.data);
        win.webContents.send('RenderFacturaPrint', response.data);
    }).catch(function(error){
            console.log(error)
        })
}else{
axios.get(`http://localhost:3000/api/facturas/mostrarNFC/${[obj[0].ID_Factura]}`).then(function(response){
    console.log(response.data)
    winPrint.webContents.send('RenderFacturaPrint2', response.data);
    win.webContents.send('RenderFacturaPrint', response.data);         
}).catch(function(error){
        console.log(error)
    })
}

}
function addUser(obj) {
    
       axios.post('http://localhost:3000/api/users',
        {User:obj.User,Contraseña:obj.Contraseña,Nombre:obj.Nombre} ).then(function (response) {
            // handle success
            console.log(response);
          }).catch(function (error) {
            // handle error
            console.log(error);
          }).then(function () {
            // always executed

    getUsuario()
          });
    
   
   
};

function getUsuario(){

    axios.get("http://localhost:3000/api/users").then(function(response){
    console.log(response.data)
  win.webContents.send('RenderUsuario',response.data)    
}).catch(function(error){
        console.log(error)
    })

}

function deleteUsuario(id){

axios.put(`http://localhost:3000/api/users/${id}`).then(function(){
    console.log(response)
}).catch(function (error) {
        console.log(error)
    }).then(function(){
        getUsuario()
    })

}

function Print(){
     // Finding Default Printer name
     let printersInfo = winPrint.webContents.getPrinters();
     let printer = printersInfo.filter(printer => printer.isDefault === true)[0];
console.log(printer.name)
     const options = {
         silent: true,
         deviceName: printer.name,
         pageSize: { height: 301000, width: 50000 }
     }

     winPrint.webContents.print(options,  (success, errorType) => {
        if (!success) console.log(errorType)
         winPrint = null;
         console.log('volvi')
     });
}






 function addCliente (obj){
    
         axios.post('http://localhost:3000/api/clientes',
        {Nombre:obj.Nombre,Apellidos:obj.Apellidos,Identidad:obj.Identidad,Telefono:obj.Telefono,Direccion:obj.Direccion,Email:obj.Email,ID_Tipo_CLI:obj.ID_Tipo_CLI} ).then(function (response) {
            // handle success
            console.log(response);
          }).catch(function (error) {
            // handle error
            console.log(error);
          })  .then(function () {
            // always executed
            let initial = { buscador :""}
            getCliente(initial)
            WinFom.hide()
          });
       
      
 
   
}

 function getCliente(obj){
    
        
         axios.get("http://localhost:3000/api/clientes").then(function (response) {
            // handle success
            win.webContents.send('RenderCliente', response.data, obj)  
            console.log(response.data)
          }).catch(function (error) {
            // handle error
            console.log(error);
          })
       
    
     
   
}

 function ModificarCli(id){
    

         axios.get(`http://localhost:3000/api/clientes/Modificar/${id}`).then(function (response) {
            // handle success
            open()
            WinFom.webContents.send('EditCliente', response.data);  
            console.log(response.data)
          }) .catch(function (error) {
            // handle error
            console.log(error);
          })
         
      
   
    
 }

function UpdateCli(obj, id){

 axios.put(`http://localhost:3000/api/clientes/${id}`,{obj: obj}).then(function(response){
    console.log(response.data)
    let initial = { buscador :""}

   
 }).catch(function(error){  console.log(error) })
 .then(function(){
    getCliente(initial)
    WinFom.hide()  
 })


}



module.exports = {
    createWindow,
    createFormulario,
    createWindowPrint
}