const { format } = require('url')
const path = require('path')

const { BrowserWindow, app, protocol } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
const { resolve } = require('app-root-path')

app.on('ready', () => {
  protocol.interceptFileProtocol('file', (req, callback) => {
    const requestedUrl = req.url.substr(7)
    if (path.isAbsolute(requestedUrl)) {
      callback(resolve(path.join('/app/renderer/out', requestedUrl)))
    } else {
      callback(requestedUrl)
    }
  })
})

app.on('ready', async () => {
  await prepareNext('./app/renderer')

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    if (isDev) {
      mainWindow.webContents.openDevTools()
    }
  })

  const devPath = 'http://localhost:8000/start'

  const prodPath = format({
    pathname: '/start/index.html',
    protocol: 'file:',
    slashes: true
  })

  const url = isDev ? devPath : prodPath
  mainWindow.loadURL(url)
  mainWindow.setMenu(null)
})

app.on('window-all-closed', app.quit)
