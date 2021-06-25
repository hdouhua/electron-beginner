const { app, BrowserWindow, ipcMain, Notification } = require('electron')

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 600,//250,
    height: 350,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  mainWindow.loadFile('./index.html')

  mainWindow.webContents.openDevTools()
  return mainWindow
}

function handleIPC() {
  ipcMain.handle('notification', async (e, { title, body, actions, actionTypes }) => {
    let res = await new Promise((resolve, reject) => {
      // log
      console.log({
        title,
        body,
        actions,
        actionTypes
      })

      // notify
      let notification = new Notification({
        title,
        body,
        actions,
      })
      notification.show()
      notification.on('action', function (_, index) {
        console.log('action', index)
        resolve({ action: actionTypes[index] })
      })
      notification.on('close', function (_) {
        console.log('close')
        resolve('close')
      })
    })
    return res
  })
}


app.whenReady().then(() => {
  handleIPC()
  createMainWindow()
})
