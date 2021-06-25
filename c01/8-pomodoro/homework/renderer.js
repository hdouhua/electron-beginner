const { ipcRenderer } = require('electron')
const ProgressBar = require('progressbar.js')
const Timer = require('timer.js')

// let timerContainer = document.getElementById('timer-container')
let switchButton = document.getElementById('switch-button')
let progressBar = new ProgressBar.Circle('#timer-container', {
  strokeWidth: 2,
  color: '#F44336',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null
})
/**
 * 0 开始工作、1 停止工作、2 开始休息、3 停止休息
 */
const ActionType = { StartToWork: 0, StopWorking: 1, StartToRest: 2, StopResting: 3 }
const WorkDuration = 1 * 15
const RestDuration = 3
let state = {}

function _getButtonText(type) {
  switch (type) {
    case 1:
      return '停止工作'
    case 2:
      return '开始休息'
    case 3:
      return '停止休息'
    default:
      return '开始工作'
  }
}

function render() {
  let { remainTime: s, type } = state
  let maxTime = type < 2 ? WorkDuration : RestDuration
  let ss = s % 60
  let mm = ((s - ss) / 60).toFixed()

  progressBar.set(1 - s / maxTime)
  progressBar.setText(`${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`)

  switchButton.innerText = _getButtonText(type)
}

function setState(_state) {
  Object.assign(state, _state)
  render()
}

function startWork() {
  setState({ type: ActionType.StopWorking, remainTime: WorkDuration })
  _timer.start(WorkDuration)
}

function startRest() {
  setState({ type: ActionType.StopResting, remainTime: RestDuration })
  _timer.start(RestDuration)
}

const _timer = new Timer({
  ontick: (ms) => { setState({ remainTime: (ms / 1000).toFixed(0) }) },
  onstop: () => { setState({ type: ActionType.startWork, remainTime: 0 }) },
  onend: function () {
    let { type } = state
    if (type === ActionType.StopWorking) {
      setState({ type: ActionType.StartToRest, remainTime: 0 })
      notification({
        title: '恭喜你完成任务',
        body: '是否开始休息？',
        actions: [
          { type: ActionType.StartToWork, text: '继续工作' },
          { type: ActionType.StartToRest, text: '休息五分钟' },
        ],
      })

    } else if (type === ActionType.StopResting) {
      setState({ type: ActionType.StartToWork, remainTime: 0 })
      notification({
        title: '休息结束',
        body: '开始新的工作吧!',
        actions: [
          { type: ActionType.StartToWork, text: '开始工作' },
          { type: ActionType.StartToRest, text: '继续休息' },
        ],
      })

    }
  }
});

switchButton.onclick = function () {
  if (this.innerText === '开始工作') {
    startWork()
  } else if (this.innerText === '开始休息') {
    startRest()
  } else {
    _timer.stop()
  }
}

async function notification({ title, body, actions }) {
  // convert
  let actionButtons = [], actionTypes = []
  actions.forEach(it => {
    actionButtons.push({ text: it.text, type: 'button' })
    actionTypes.push(it.type)
  });

  // invoke
  let res = await ipcRenderer.invoke('notification', {
    title,
    body,
    actions: actionButtons,
    actionTypes
  })

  // handle response
  console.log('res', res)
  if (res.action === ActionType.StartToWork) {
    startWork()
  } else if (res.action === ActionType.StartToRest) {
    startRest()
  } else {
    // nothing to do
  }

}

setState({
  type: ActionType.StartToWork,
  remainTime: 0
})
