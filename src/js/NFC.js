
let mylistNFC;
let NFC
let btnNfc
let NCFForm

document.addEventListener("DOMContentLoaded", function(){
    mylistNFC = document.getElementById("mylistNFC")
    NFC = document.getElementById("Nfc")
    btnNfc =document.getElementById("addNfc")
    renderGetProducts2()
    NCFForm = document.getElementById("NCFForm")
    btnNfc.onclick = function(){
        const obj = {Nfc: NFC.value, Estatus: 'Nuevo'}
        ipcRenderer.invoke('addNFC', obj)
        limpiarNFC()
    }

})
function limpiarNFC (){
    NFC.value = ""
}

async function renderGetProducts2(){
    await ipcRenderer.invoke('GetNFC')
}

ipcRenderer.on('RenderNfc',(event, results) =>{
        let template =""
        const list = results
        list.forEach(element =>{
            template +=`
            
            <tr>
      <td>${element.ID_NFC}</td>
      <td>${element.NFC}</td>
      <td>${element.Estatus}</td>
    <td onclick = "EliminarNFC(${element.ID_NFC})" >Eliminar</td>
    </tr>
    `
        });
        mylistNFC.innerHTML = template;
    })

    function EliminarNFC(id){
        console.log(id)
     ipcRenderer.invoke('EliminarNFC', id)  
    }