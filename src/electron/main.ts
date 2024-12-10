import { app, BrowserWindow } from "electron";
import { isDev } from "./util.js";
import { pollResource } from "./resourceManage.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    // disables default system frame (dont do this if you want a proper working menu bar)
    frame: false,
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }
  pollResource(mainWindow);
});
