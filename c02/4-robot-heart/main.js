const { app, BrowserWindow, ipcMain } = require('electron')
const robot = require('robotjs')

let win
let pos

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

  pos = win.getPosition()
}

app.on('ready', () => {
  createWindow()

  console.log("node version:", process.versions.node)
  console.log("electron version:", process.versions.electron)

  ipcMain.on('robot-move', (e, x, y) => {
    // console.debug('move to:', x, y)

    win.webContents.send('robot-draw', x - pos[0], y - pos[1] - 28)

    robot.moveMouse(x, y);
    robot.mouseClick();
  })

})
