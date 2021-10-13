const {autoUpdater} = require('electron-updater')

const {createWindow} = require('./main.js')
const {app} = require('electron')

require('electron-reload')(__dirname);

autoUpdater.checkForUpdatesAndNotify()

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow)