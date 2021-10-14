const { getconexion } = require ('./database');
const electron = require('electron')
const {webContents} = electron.webContents
const {Notification} = require('electron')
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const fs = require('fs')
const os = require('os')
const path = require('path')
const shell = electron.shell
const { autoUpdater } = require('electron-updater')

let WinFom;
let win;
let winPrint;

function createWindow(){
 win = new BrowserWindow({
   
    webPreferences: {
        resizable: false,
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false
    }
})
win.loadFile('src/views/Facturas.html')
win.once("ready-to-show", () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
  
createWindowPrint()
win.on("closed", ()=>{
    win = null
})   
}

function createWindowPrint(){
    winPrint = new BrowserWindow({
       webPreferences: {
           resizable: false,
           nodeIntegration: true,
           enableRemoteModule: true,
           contextIsolation: false
       }
   })
//winPrint.hide()
   winPrint.loadURL('https://github.com')
//winPrint.hide()
   winPrint.on("closed", ()=>{
    winPrint = undefined;
})   
   }
   
function createFormulario(){
    WinFom = new BrowserWindow({
width:400,
height: 715,
resizable: false,
        webPreferences: {
            resizable: false,
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    })
    WinFom.loadFile('src/views/formulario.html')
    };

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

ipcMain.handle('GetComprobante', (event) =>{
    getComprobante()
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
    

ipcMain.handle('OpenPrint', (event) =>{
    winPrint.show()
 })
 
ipcMain.handle('login', (event, obj) => {
    validarlogin(obj);
 })

 const validarlogin = async (obj) =>  {
    
    let usu = obj.usuario;
    let con = obj.contraseña;
    const conn = await getconexion();
  
    const sql = "SELECT * FROM `Usuario` WHERE Nom_Usuario = ? AND Contraseña = ?"
    await   conn.query(sql, [usu, con], (error, results, fields)  => 
    { 
        if (error) {
        console.log(error);
    }
    win.webContents.send('RenderLogin', results);
})
db.end()
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
   
    
    

function open (){
    createFormulario()
    WinFom.show()
}

async function getFacturaIndividual(){
    const db = await getconexion()
    const sql = 'SELECT Factura.ID_Factura, Factura.ID_NFC FROM `Factura` ORDER BY `Factura`.`ID_Factura` DESC LIMIT 1;'

await db.query(sql,  (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        let initial = { buscador :""}
        console.log(results)
   presentarDatos(results)
    getFactura(initial)
    })
db.end()

}

async function getfactunf(obj){
    const db = await getconexion()
    const sql = 'SELECT Factura.ID_Factura, Factura.ID_NFC FROM `Factura` WHERE Factura.ID_Factura = ?;'

await db.query(sql, [obj], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        let initial = { buscador :""}

        console.log(results)
        presentarDatos(results)
        getFactura(initial)      
    })
db.end()

}

async function getFactura(obj){
    const db = await getconexion()
    
    const sql = 'SELECT `Factura`.`ID_Factura`, `Factura`.`SubTotal`, `Factura`.`Total`, `Factura`.`Fecha`, `Cliente`.`ID_CLI`, `Cliente`.`Nombre`, `Tipo_Factura`.`Tipo` FROM `Factura` INNER JOIN `Cliente` ON `Factura`.`ID_CLI` = `Cliente`.`ID_CLI` INNER JOIN `Tipo_Factura` ON `Factura`.`ID_Tipo_Factura` = `Tipo_Factura`.`ID_Tipo_Factura`'
    await db.query(sql,  (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            win.webContents.send('RenderFacturas', results, obj);
        })
    db.end()
}

async function addProducto (obj){
    const db = await getconexion()
    const sql = 'INSERT INTO `Producto` (`Producto`, `Descripcion`, `Precio`, `ID_Tipo_Producto`) VALUES (?, ?, ?, ?)';
    await db.query(sql,[obj.Nombre, obj.DescripcionProduc, obj.Precio, obj.TipoProduc],  (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        getServicios()
    })
    db.end()
}

async function getComprobante() {
    const db = await getconexion()
    const sql = 'SELECT * FROM `NFC` WHERE `Estatus` = "Nuevo" LIMIT 1';
    await db.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        win.webContents.send('RenderComprobante', results)
    })
    db.end()
}

async function sendFactura(objFactura) {
    const db = await getconexion()
    await db.query(objFactura, (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        let initial = { buscador :""}

        console.log(results)
    getFactura(initial)
    })
    db.end()
}

async function detalleSFactura(objDetalles) {
    const db = await getconexion()
    await db.query(objDetalles, (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        console.log(results)
    })
    db.end()
}

async function addCliente (obj){
    const db = await getconexion()
    const sql = 'INSERT INTO `Cliente` ( `Nombre`, `Apellidos`, `Identidad`, `Telefono`, `Direccion`, `Email`, `ID_Tipo_CLI`) VALUES ( ?,?, ?, ?, ?, ?, ?, ?)';
    await db.query(sql,[obj.Nombre, obj.Apellidos, obj.Identidad, obj.Telefono, obj.Direccion, obj.Email, obj.TCliente],  (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        let initial = { buscador :""}
        console.log(results)
        getCliente(initial)
    })
    db.end()
}

async function getFacturaFilt(obj){
    const db = await getconexion()
    await db.query(obj, (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        console.log(results)
        win.webContents.send('RenderFacturaFill', results);
    })
    db.end()
}

async function presentarDatos(obj){
    const db = await getconexion()
    console.log(obj[0].ID_Factura)
    console.log(obj[0].ID_NFC)
let sql =""
    if(obj[0].ID_NFC == null){

    sql = 'SELECT Factura.ID_Factura, Factura.Comentario, Factura.SubTotal, Factura.Impuesto, Factura.Total, Factura.Fecha, Cliente.Nombre AS NombreCliente, Cliente.Identidad, Cliente.Telefono, Cliente.Direccion, Cliente.Email, Usuario.Nombre, Tipo_Factura.Tipo, Detalles_Factura.Precio, Detalles_Factura.Total AS totalp, Detalles_Factura.Cantidad, Producto.Producto FROM Factura INNER JOIN Cliente ON Factura.ID_CLI = Cliente.ID_CLI INNER JOIN Usuario ON Factura.ID_usu = Usuario.ID_Usu INNER JOIN Tipo_Factura ON Factura.ID_Tipo_Factura = Tipo_Factura.ID_Tipo_Factura INNER JOIN Detalles_Factura ON Detalles_Factura.ID_Factura = Factura.ID_Factura INNER JOIN Producto ON Producto.ID_Producto = Detalles_Factura.ID_Producto WHERE Factura.ID_Factura = ?;'
}else{
    sql = 'SELECT Factura.ID_Factura, NFC.NFC, Factura.ID_NFC, Factura.Comentario, Factura.SubTotal, Factura.Impuesto, Factura.Total, Factura.Fecha, Cliente.Nombre AS NombreCliente, Cliente.Identidad, Cliente.Telefono, Cliente.Direccion, Cliente.Email, Usuario.Nombre, Tipo_Factura.Tipo, Detalles_Factura.Precio, Detalles_Factura.Total AS totalp, Detalles_Factura.Cantidad, Producto.Producto FROM Factura INNER JOIN Cliente ON Factura.ID_CLI = Cliente.ID_CLI INNER JOIN Usuario ON Factura.ID_usu = Usuario.ID_Usu INNER JOIN Tipo_Factura ON Factura.ID_Tipo_Factura = Tipo_Factura.ID_Tipo_Factura INNER JOIN Detalles_Factura ON Detalles_Factura.ID_Factura = Factura.ID_Factura INNER JOIN Producto ON Producto.ID_Producto = Detalles_Factura.ID_Producto INNER JOIN NFC ON NFC.ID_NFC = Factura.ID_NFC WHERE Factura.ID_Factura = ?;'
}

await db.query(sql,[obj[0].ID_Factura],  (error, results, fields) => {
    if (error) {
        console.log(error);
    }
    console.log(results)

    winPrint.webContents.send('RenderFacturaPrint2', results);
    win.webContents.send('RenderFacturaPrint', results);     
})
db.end()
}

async function addUser (obj){
    const db = await getconexion()
    const sql = 'INSERT INTO `Usuario` (`Nom_Usuario`, `Contraseña`, `Nombre`, `Nivel`) VALUES (?, ?, ?, 2)';
    await db.query(sql,[ obj.User, obj.Contraseña, obj.Nombre],  (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        console.log(results)
        getUsuario()
        
    })
    db.end()
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

async function addNFC (obj){
    const db = await getconexion()
    const sql = 'INSERT INTO `NFC` (`NFC`, `Estatus`) VALUES (?, ?)';
    await db.query(sql,[obj.Nfc, obj.Estatus],  (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        console.log(results)
        getNFC()
    })
    db.end()
}

async function getServicios(){
    const db = await getconexion()
    const sql = 'SELECT Producto.ID_Producto ,Producto.Producto, Producto.Descripcion, Producto.Precio, Tipo_Producto.Nombre FROM Producto INNER JOIN Tipo_Producto ON Producto.ID_Tipo_Producto = Tipo_Producto.ID_Tipo_Producto'
    await db.query(sql,  (error, results, fields) => {
            if (error) {
                console.log(error);
            }
        win.webContents.send('RenderServicios', results);
        })
    db.end()
}

async function getNFC(){
    const db = await getconexion()
    const sql = 'SELECT * FROM `NFC` ORDER BY `NFC`.`Estatus` ASC'
    await db.query(sql,  (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        win.webContents.send('RenderNfc', results);
})
    db.end()
}

async function getCliente(obj){
    const db = await getconexion()
    const sql = 'SELECT Cliente.ID_CLI, Cliente.Nombre, Cliente.Apellidos, Cliente.Identidad, Cliente.Telefono, Cliente.Direccion, Cliente.Email, Cliente.ID_Tipo_CLI, Tipo_Cliente.Tipo_cliente FROM Cliente INNER JOIN Tipo_Cliente ON Cliente.ID_Tipo_CLI = Tipo_Cliente.ID_Tipo_CLI'
    await db.query(sql,  (error, results, fields) => {
        if (error) {
            console.log(error);
        }
  win.webContents.send('RenderCliente', results, obj)
    })
    db.end()
}

async function getUsuario(){
    const db = await getconexion()
    const sql = 'SELECT * From `Usuario`'
    await db.query(sql,  (error, results, fields) => {
        if (error) {
            console.log(error);
        }
  win.webContents.send('RenderUsuario', results)
    })
    db.end()
}

async function deleteUsuario(obj){
    const db = await getconexion()
    const sql = 'DELETE FROM `Usuario` WHERE `Usuario`.`ID_Usu` = ?'
    await db.query(sql,[obj],  (error, results, fields) => {
        if (error) {
            console.log(error);
        }
 // win.webContents.send('RenderUsuario', results)

 getUsuario()    
})
    db.end()
}

module.exports = {
    createWindow,
    createFormulario,
createWindowPrint
}