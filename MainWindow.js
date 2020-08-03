const { BrowserWindow } = require("electron");

class MainWIndow extends BrowserWindow {
  constructor(file, isDev) {
    super({
      title: "Weather Wonders",
      width: isDev ? 800 : 355,
      height: 600,
      icon: "./assets/icons/icon.png",
      show: false,
      opacity: 1,
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
