import React, { useState, useEffect } from 'react'
const { ipcRenderer } = window.require('electron')// 引入渲染进程

function App () {
  const [remoteCode, setRemoteCode] = useState('')//控制的控制码
  const [localCode, setLocalCode] = useState('')//本身的控制码
  const [controlText, setControlText] = useState('')//控制码的文案

  const login = async () => {
    // 登录状态是主进程维护，通过主进程来处理ipc事件
    console.log("111")
    let code = await ipcRenderer.invoke('login')
    console.log(setLocalCode(code))
    if (!code) {
      return setLocalCode(code)//本身控制码重新赋值
    }
  }

  useEffect(() => {
    // login()
    // /监听ipc事件，从主进程传过来的，说明现在的控制状态是否发生了改变
    ipcRenderer.on('control-state-change', handleControlChange)
    return () => {
      ipcRenderer.removeListener('control-state-change', handleControlChange)

    };
  }, [])
  const handleControlChange = (e, name, type) => {
    // 状态文案改变
    let text = ''
    if (type === 1) {
      // 控制别人
      text = `正在远程控制${name}`
    } else {
      text = `被${name}控制`
    }
    setControlText(text)
  }

  const startControl = (remoteCode) => {
    ipcRenderer.send('control', remoteCode)

  }
  return <div className="App">
    {
      controlText ? <>
        <div>你的控制码：{localCode}</div>
        <input type="text" value={remoteCode} onChange={e => setRemoteCode(e.target.value)} />
        <button onClick={() => startControl(remoteCode)}>确认</button>
      </> : <div>{controlText}</div>
    }
  </div>
}
export default App
