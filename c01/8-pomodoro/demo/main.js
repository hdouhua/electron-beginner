const { app, BrowserWindow, Notification, ipcMain } = require('electron')

function createMainWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })

  win.loadFile('./index.html')

  // win.webContents.openDevTools()
}

function handleIPC() {
  ipcMain.handle('work-notification', async function () {
    let res = await new Promise((resolve, reject) => {
      let notification = new Notification({
        title: '任务结束',
        body: '是否开始休息？',
        actions: [{ text: '开始休息 ！！', type: 'button' }],
        closeButtonText: '继续工作 >>'
      })
      notification.show()
      notification.on('action', () => {
        resolve('rest')
      })
      notification.on('close', () => {
        resolve('work')
      })
    })
    return res
  })
}


app.whenReady().then(() => {
  createMainWindow()
  handleIPC()

  app.on('window-all-closed', function () {
    if (process.platform === 'darwin') {
      app.quit()
    }
  })
})
