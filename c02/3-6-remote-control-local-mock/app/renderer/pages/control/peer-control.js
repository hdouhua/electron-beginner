const EventEmitter = require('events')
const { ipcRenderer, desktopCapturer } = require('electron')

const peer = new EventEmitter()

async function getScreenStream() {
  const sources = await desktopCapturer.getSources({ types: ['screen'] })

  navigator.webkitGetUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: sources[0].id,
        maxWidth: window.screen.width,
        maxHeight: window.screen.height
      }
    }
  }, (stream) => {
    peer.emit('add-stream', stream)
  }, (err) => {
    console.error(err)
  })
}

peer.on('robot', (type, data) => {
  console.log('robot', type, data)

  if (type === 'mouse') {
    data.screen = {
      width: window.screen.width,
      height: window.screen.height
    }
  }

  setTimeout(() => {
    ipcRenderer.send('robot', type, data)
  }, 2000)

})

getScreenStream()

module.exports = peer
