const path = require('path')
const { BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

const RendererMainPage = path.resolve(__dirname, '../../renderer/pages/main/index.html')
let win

function create() {
  win = new BrowserWindow({
    width: 600,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:3000')
  } else {
    win.loadFile(RendererMainPage)
  }

  return win
}

function send(channel, ...args) {
  win.webContents.send(channel, ...args)
}

module.exports = { create, send }
