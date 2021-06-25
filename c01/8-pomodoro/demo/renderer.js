const { ipcRenderer } = require('electron')
const Timer = require('timer.js')

let workTimer = new Timer({
  ontick: (ms) => {
    updateTime(ms)
  },
  onend: () => {
    updateTime(0)
    notification()
  }
})

function startWork() {
  workTimer.start(10)
  updateTime(10*1000)
}

function updateTime(ms) {
  let timerContainer = document.getElementById('timer-container')
  let s = Number((ms / 1000).toFixed(0))
  let ss = Math.floor(s % 60)
  let mm = Math.floor(s / 60)
  timerContainer.innerText = `${mm.toString().padStart(2, 0)}: ${ss.toString().padStart(2, 0)}`
}

async function notification() {
  let res = await ipcRenderer.invoke('work-notification')
  if (res === 'rest') {
    setTimeout(() => {
      alert('休息结束！')
    }, 5 * 1000)
  } else if (res === 'work') {
    startWork()
  }
}

startWork()
