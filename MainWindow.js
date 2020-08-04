const { BrowserWindow } = require("electron");

class MainWIndow extends BrowserWindow {
  constructor(file, isDev) {
    super({
      title: "Weather Up",
      width: isDev ? 800 : 400,
      height: 600,
      icon: "./assets/icons/icon.png",
      // show: false,
      opacity: 0.98,
      resizable: isDev,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    this.loadFile(file);
    if (isDev) {
      this.webContents.openDevTools();
    }
  }
}

module.exports = MainWIndow;
