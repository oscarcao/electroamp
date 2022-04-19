import { contextBridge, ipcRenderer } from 'electron'
import { isDev, logger } from './helpers'

// Disable the eval() function
window.eval = global.eval = () => {
  throw new Error(`window.eval() is disabled.`)
}

contextBridge.exposeInMainWorld('electronAPI', {
  loadState: () => ipcRenderer.invoke('webamp-load-state'),
})

const updateIgnoreMouseEvents = (event: Event) => {
  if(isDev)
    logger.log(`updateIgnoreMouseEvents: ${event.type}`)

  if (event.type === 'pointerenter')
    ipcRenderer.send('set-ignore-mouse-events', false)
  if (event.type === 'pointerleave')
    ipcRenderer.send('set-ignore-mouse-events', true)
}

const bindPointerEvents = (el: HTMLElement) => {
  el.removeEventListener('pointerenter', updateIgnoreMouseEvents)
  el.removeEventListener('pointerleave', updateIgnoreMouseEvents)
  el.addEventListener('pointerenter', updateIgnoreMouseEvents)
  el.addEventListener('pointerleave', updateIgnoreMouseEvents)
}

const bindContextMenuEvents = (el: HTMLElement) => {
  el.addEventListener('pointerenter', updateIgnoreMouseEvents)
  el.addEventListener('pointerleave', updateIgnoreMouseEvents)
  el.addEventListener(
    'click',
    () => {
      el.removeEventListener('pointerenter', updateIgnoreMouseEvents)
      el.removeEventListener('pointerleave', updateIgnoreMouseEvents)
      ipcRenderer.send('set-ignore-mouse-events', true)
    },
    { once: true }
  )
}

window.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
    if(isDev)
      logger.log('mutation')

    const mainWindow = document.getElementById('main-window')
    bindPointerEvents(mainWindow)

    const minimizeButton = document.getElementById('minimize')
    if (minimizeButton)
      minimizeButton.onclick = () => {
        ipcRenderer.send('minimize-app')
      }

    const closeButton = document.getElementById('close')
    if (closeButton)
      closeButton.onclick = () => {
        ipcRenderer.send('close-app')
      }

    const eqWindow = document.getElementById('equalizer-window')
    if (eqWindow) bindPointerEvents(eqWindow)

    const plWindow = document.getElementById('playlist-window')
    if (plWindow) bindPointerEvents(plWindow)

    const plShadeWindow = document.getElementById('playlist-window-shade')
    if (plShadeWindow) bindPointerEvents(plShadeWindow)

    const contextMenu = document.getElementById('webamp-context-menu')
    if (contextMenu) bindContextMenuEvents(contextMenu)
  })

  observer.observe(document.getElementsByTagName('body')[0], {
    childList: true,
    attributes: true
  })
})
