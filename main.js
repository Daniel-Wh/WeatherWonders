const MainWindow = require("./MainWindow");
const AppTray = require("./AppTray");
const { app, Menu, IpcMain, BrowserWindow } = require("electron");
const path = require("path");

process.env.NODE_ENV = "development";

const isDev = process.env.NODE_ENV !== "production" ? true : false;
const isMac = process.platform === "darwin" ? true : false;

let mainWindow;
let tray;
let icon;

icon = path.join(__dirname, "assets", "icons", "tray_icon.png");

function createMainWindow() {
  mainWindow = new MainWindow("./app/index.html", isDev);
}

app.on("ready", () => {
  createMainWindow();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  tray = new AppTray(icon, mainWindow);
});

const menu = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    role: "fileMenu",
  },
  //   {
  //     label: "View",
  //     submenu: [
  //       {
  //         label: "Toggle Navigation",
  //         click: () => mainWindow.webContents.send("nav:toggle"),
  //       },
  //     ],
  //   },
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { type: "separator" },
            { role: "toggledevtools" },
          ],
        },
      ]
    : []),
];

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

app.allowRendererProcessReuse = true;
