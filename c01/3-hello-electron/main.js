const { app, BrowserWindow } = require('electron')

function createWidnow() {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
  })

  win.loadFile('index.html')
}

app.whenReady().then(()=>{
  createWidnow()

  app.on('window-all-closed', function(){
    if(process.platform === 'darwin') {
      app.quit()
    }
  })
})
