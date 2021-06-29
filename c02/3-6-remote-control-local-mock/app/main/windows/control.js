const { BrowserWindow } = require('electron')
const path = require('path')

const RendererControlPage = path.resolve(__dirname, '../../renderer/pages/control/index.html')
let win

function create() {
  win = new BrowserWindow({
    width: 1000,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile(RendererControlPage)

  return win
}

module.exports = { create }
