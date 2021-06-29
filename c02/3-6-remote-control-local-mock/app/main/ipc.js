const { ipcMain } = require('electron')
const { create: createControlWindow } = require('./windows/control')
const { send: sendInMainWindow } = require('./windows/main')

module.exports = function () {
  //跟服务端的交互
  ipcMain.handle('login', async () => {
    // code algorithm
    let code = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    return code
  })
  ipcMain.on('control', async (e, remoteCode) => {
    console.log('in control ...')
    // 成功后我们会唤起面板
    createControlWindow()
    sendInMainWindow('control-state-change', remoteCode, 1)
  })
}
