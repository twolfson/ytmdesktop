const { ipcMain } = require('electron')
const { doBehavior } = require('../utils/window')

let statusBarMenu = [
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo',
            },
            {
                role: 'redo',
            },
            {
                type: 'separator',
            },
            {
                role: 'cut',
            },
            {
                role: 'copy',
            },
            {
                role: 'paste',
            },
            {
                role: 'pasteandmatchstyle',
            },
            {
                role: 'delete',
            },
            {
                role: 'selectall',
            },
            {
                type: 'separator',
            },
            {
                label: 'Speech',
                submenu: [
                    {
                        role: 'startspeaking',
                    },
                    {
                        role: 'stopspeaking',
                    },
                ],
            },
        ],
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    global.mainWindow.getBrowserView().webContents.reload()
                },
            },
            {
                label: 'Open Developer Tools',
                accelerator:
                    process.platform === 'darwin'
                        ? 'Alt+Command+I'
                        : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    global.mainWindow.getBrowserView().webContents.openDevTools({ mode: 'detach' });
                },
            },
            {
                type: 'separator',
            },
            {
                role: 'resetzoom',
            },
            {
                role: 'zoomin',
            },
            {
                role: 'zoomout',
            },
            {
                type: 'separator',
            },
            {
                role: 'togglefullscreen',
            },
        ],
    },
    {
        label: 'History',
        submenu: [
            {
                label: 'Home(YouTube Music)',
                accelerator: 'CmdOrCtrl+H',
                click(item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow
                            .getBrowserView()
                            .webContents.loadURL('https://music.youtube.com')
                },
            },
            {
                type: 'separator',
            },
            {
                label: 'Back',
                accelerator: 'CmdOrCtrl+[',
                click(item, focusedWindow) {
                    if (focusedWindow)
                        if (
                            focusedWindow
                                .getBrowserView()
                                .webContents.canGoBack()
                        )
                            focusedWindow.getBrowserView().webContents.goBack()
                },
            },
            {
                label: 'Forward',
                accelerator: 'CmdOrCtrl+]',
                click(item, focusedWindow) {
                    if (focusedWindow)
                        if (
                            focusedWindow
                                .getBrowserView()
                                .webContents.canGoForward()
                        )
                            focusedWindow
                                .getBrowserView()
                                .webContents.goForward()
                },
            },
        ],
    },
    {
        role: 'window',
        submenu: [
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close',
            },
            {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize',
            },
            {
                label: 'Zoom',
                role: 'zoom',
            },
            {
                type: 'separator',
            },
            {
                label: 'Bring All to Front',
                role: 'front',
            },
        ],
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() {
                    require('electron').shell.openExternal(
                        'http://electron.atom.io'
                    )
                },
            },
        ],
    },
]
statusBarMenu.unshift({
    label: 'YouTube Music Desktop',
    submenu: [
        {
            role: 'about',
        },
        {
            type: 'separator',
        },
        {
            role: 'services',
            submenu: [],
        },
        {
            type: 'separator',
        },
        {
            role: 'hide',
        },
        {
            role: 'hideothers',
        },
        {
            role: 'unhide',
        },
        {
            type: 'separator',
        },
        {
            role: 'quit',
        },
    ],
})

const popUpMenu = (__, saved_mainWindow, mediaControl, app) => {
    return [
        {
            label: 'YouTube Music Desktop',
            type: 'normal',
            click: function () {
                doBehavior(saved_mainWindow)
            },
        },

        {
            label: __.trans('MEDIA_CONTROL_PLAY_PAUSE'),
            type: 'normal',
            click: function () {
                mediaControl.playPauseTrack(saved_mainWindow.getBrowserView())
            },
        },

        {
            label: __.trans('MEDIA_CONTROL_PREVIOUS'),
            type: 'normal',
            click: function () {
                mediaControl.previousTrack(saved_mainWindow.getBrowserView())
            },
        },

        {
            label: __.trans('MEDIA_CONTROL_NEXT'),
            type: 'normal',
            click: function () {
                mediaControl.nextTrack(saved_mainWindow.getBrowserView())
            },
        },

        { type: 'separator' },

        {
            label: __.trans('LABEL_EXIT'),
            type: 'normal',
            click: function () {
                app.exit()
            },
        },
    ]
}

module.exports = {
    statusBarMenu: statusBarMenu,
    popUpMenu: popUpMenu,
}
