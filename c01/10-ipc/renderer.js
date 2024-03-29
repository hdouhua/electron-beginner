const { ipcRenderer, remote } = require('electron')

ipcRenderer.send('do-some-work', 1, 2)

ipcRenderer.on('do-some-render-work', () => {
  alert('do some work')
})

// communicate from page1 -> page2
let sharedObject = remote.getGlobal('sharedObject') //share data by remote global object
let win2WebContentsId = sharedObject.win2WebContentsId
ipcRenderer.sendTo(win2WebContentsId, 'do-some-work', 1)
