import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

var hideToggle = false ;

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey='0'
    changePositionKey='9'
    defaultIsVisible={hideToggle}
    defaultPosition='bottom'
     >

    <LogMonitor />
  </DockMonitor>
)
