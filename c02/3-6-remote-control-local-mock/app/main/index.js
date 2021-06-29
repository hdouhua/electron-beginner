const { app, BrowserWindow } = require('electron')
const path = require('path')
const handleIPC = require('./ipc')
const { create: createMainWindow } = require('./windows/main')
const { create: createControlWindow } = require('./windows/control')


app.whenReady().then(() => {
  // createControlWindow()
  createMainWindow()
  handleIPC()
  require('./robot.js')()

  app.on('window-all-closed', function () {
    if (process.platform === 'darwin') {
      app.quit()
    }
  })
})
