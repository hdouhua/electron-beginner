const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
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

  const modifiers = []
  if (process.platform === 'darwin') {
    globalShortcut.register('Command+Option+I', () => {
      console.log('Command+Option+I is pressed')
      win.webContents.openDevTools()
    })

    modifiers.push('command')
    modifiers.push('alt')
  } else {
    globalShortcut.register('Ctrl+Shift+I', () => {
      console.log('Ctrl+Shift+I is pressed')
      win.webContents.openDevTools()
    })

    modifiers.push('ctrl')
    modifiers.push('shift')
  }
  robot.keyTap('i', modifiers)


  ipcMain.on('robot-move', (e, x, y) => {
    // console.debug('move to:', x, y)

    // calculate the relative position with window, 28 is the height of title bar of window
    win.webContents.send('robot-draw', x - pos[0], y - pos[1] - 28)

    robot.moveMouse(x, y);
    // robot.mouseClick();
  })

})

app.on('will-quit', () => {
  // unregister global shortcuts
  globalShortcut.unregister('Command+Option+I')
  globalShortcut.unregister('Ctrl+Shift+I')

  // unregister all global shortcuts
  globalShortcut.unregisterAll()
})
