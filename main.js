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

winPrint.hide()
WinFom.hide()

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

async function EliminarNFC(id){
    const conn = await getconexion();
console.log(id)
    const sql = "UPDATE `NFC` SET `Borrado` = '1' WHERE `NFC`.`ID_NFC` = ?"
    await conn.query(sql, id, (error, results, fields)  => 
    { 
        if (error) {
        console.log(error);
    }
        getNFC()
})
db.end()
 }


 async function EliminarProductos(id){
    const conn = await getconexion();
console.log(id)
    const sql = "UPDATE `Producto` SET `Borrado` = '1' WHERE `Producto`.`ID_Producto` = ?"
    await conn.query(sql, id, (error, results, fields)  => 
    { 
        if (error) {
        console.log(error);
    }
        getServicios()
})
db.end()
 }

async function ModificarCli(id){
    const db = await getconexion()
    const sql = 'SELECT Cliente.ID_CLI, Cliente.Nombre, Cliente.Apellidos, Cliente.Identidad, Cliente.Telefono, Cliente.Direccion, Cliente.Email, Cliente.ID_Tipo_CLI, Tipo_Cliente.Tipo_cliente FROM Cliente INNER JOIN Tipo_Cliente ON Cliente.ID_Tipo_CLI = Tipo_Cliente.ID_Tipo_CLI WHERE Cliente.ID_CLI = ?'
    await db.query(sql, id, (error, results, fields) => {
        if (error) {
            console.log(error);
        }
open()
        WinFom.webContents.send('EditCliente', results);
    })
    db.end()
 }

async function UpdateCli(obj, id){
    const db = await getconexion()
    const sql = 'UPDATE Cliente SET ? WHERE ID_CLI = ?'
    await db.query(sql, [obj, id], (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        let initial = { buscador :""}

    getCliente(initial)
    WinFom.hide()
    })
    db.end()  
}

function crearDocs(obj){
    console.log(obj)
        // Use default printing options
        winPrint.webContents.printToPDF({}).then
        (data => {
          const pdfPath = path.join(os.homedir(), 'Desktop', `'${obj.nombre}${obj.date}.pdf'`)
          fs.writeFile(pdfPath, data,(error) => {
            if (error) throw error
            new Notification({
                title: "ConforpraTech",
                body: `Se descargo su archivo pdf en: ${pdfPath}`
            }).show()
          })

        }).catch(error => {
            new Notification({
                title: "ConforpraTech",
                body: `Failed to write PDF to ${error} `
            }).show()
        })
      }




function open(){
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
    const sql = 'SELECT * FROM `NFC` WHERE `Estatus` = "Nuevo" AND Borrado = 0  LIMIT 1';
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
    const sql = 'INSERT INTO `Cliente` ( `Nombre`, `Apellidos`, `Identidad`, `Telefono`, `Direccion`, `Email`, `ID_Tipo_CLI`) VALUES ( ?,?, ?, ?, ?, ?, ?)';
    await db.query(sql,[obj.Nombre, obj.Apellidos, obj.Identidad, obj.Telefono, obj.Direccion, obj.Email, obj.ID_Tipo_CLI],  (error, results, fields) => {
        if (error) {
            console.log(error);
        }
        let initial = { buscador :""}
        console.log(results)
        getCliente(initial)
        WinFom.hide()
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

    sql = 'SELECT Factura.ID_Factura, Factura.Comentario, Factura.SubTotal, Factura.Impuesto, Factura.Total, Factura.Fecha, Cliente.ID_CLI , Cliente.Nombre AS NombreCliente,Cliente.Apellidos ,Cliente.Identidad, Cliente.Telefono, Cliente.Direccion, Cliente.Email, Usuario.Nombre, Tipo_Factura.Tipo, Detalles_Factura.Precio, Detalles_Factura.Total AS totalp, Detalles_Factura.Cantidad, Producto.Producto FROM Factura INNER JOIN Cliente ON Factura.ID_CLI = Cliente.ID_CLI INNER JOIN Usuario ON Factura.ID_usu = Usuario.ID_Usu INNER JOIN Tipo_Factura ON Factura.ID_Tipo_Factura = Tipo_Factura.ID_Tipo_Factura INNER JOIN Detalles_Factura ON Detalles_Factura.ID_Factura = Factura.ID_Factura INNER JOIN Producto ON Producto.ID_Producto = Detalles_Factura.ID_Producto WHERE Factura.ID_Factura = ?;'
}else{
    sql = 'SELECT Factura.ID_Factura, NFC.NFC, Factura.ID_NFC, Factura.Comentario, Factura.SubTotal, Factura.Impuesto, Factura.Total, Factura.Fecha, Cliente.ID_CLI ,Cliente.Nombre AS NombreCliente,Cliente.Apellidos ,Cliente.Identidad, Cliente.Telefono, Cliente.Direccion, Cliente.Email, Usuario.Nombre, Tipo_Factura.Tipo, Detalles_Factura.Precio, Detalles_Factura.Total AS totalp, Detalles_Factura.Cantidad, Producto.Producto FROM Factura INNER JOIN Cliente ON Factura.ID_CLI = Cliente.ID_CLI INNER JOIN Usuario ON Factura.ID_usu = Usuario.ID_Usu INNER JOIN Tipo_Factura ON Factura.ID_Tipo_Factura = Tipo_Factura.ID_Tipo_Factura INNER JOIN Detalles_Factura ON Detalles_Factura.ID_Factura = Factura.ID_Factura INNER JOIN Producto ON Producto.ID_Producto = Detalles_Factura.ID_Producto INNER JOIN NFC ON NFC.ID_NFC = Factura.ID_NFC WHERE Factura.ID_Factura = ?;'
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
         pageSize: { height: 301000, width: 50000 },
         footer:"Conforpra. C. Juan Sánchez Ramírez 56, Santo Domingo 10105. (809)-908-4443. conforpra.servicios@gmail.com"
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
    const sql = 'SELECT Producto.ID_Producto ,Producto.Producto, Producto.Descripcion, Producto.Precio, Tipo_Producto.Nombre FROM Producto INNER JOIN Tipo_Producto ON Producto.ID_Tipo_Producto = Tipo_Producto.ID_Tipo_Producto WHERE Borrado = 0;'
    await db.query(sql,  (error, results, fields) => {
            if (error) {
                console.log(error);
            }
        win.webContents.send('RenderServicios', results);
        console.log(results)
        })
    db.end()
}

async function getNFC(){
    const db = await getconexion()
    const sql = 'SELECT * FROM `NFC` WHERE Borrado = 0 ORDER BY `NFC`.`Estatus` ASC '
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