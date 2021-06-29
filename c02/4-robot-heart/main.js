const { app, BrowserWindow, ipcMain } = require('electron')
const robot = require('robotjs')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('./index.html')
}

app.on('ready', () => {
  createWindow()

  console.log("node version:", process.versions.node)
  console.log("electron version:", process.versions.electron)

  ipcMain.on('robot-move', (e, x, y) => {
    console.log('move to:', x, y)
    robot.moveMouse(x, y);
    robot.mouseClick();
  })
})
