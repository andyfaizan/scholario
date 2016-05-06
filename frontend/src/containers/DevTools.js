import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import Dispatcher from 'redux-devtools-dispatch';
import MultipleMonitors from 'redux-devtools-multiple-monitors';
import actions from '../redux/modules/Material'

var hideToggle = false ;

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey='0'
    changePositionKey='9'
    defaultIsVisible={hideToggle}
    defaultPosition='bottom'
    >
    <MultipleMonitors>
      <LogMonitor />
      <Dispatcher/>
    </MultipleMonitors>
  </DockMonitor>
)
