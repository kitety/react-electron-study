const { ipcMain } = require("electron");
const { send: sendMainWindow } = require("./windows/main");
const { create: createControlWindow } = require("./windows/control");

module.exports = function () {
  ipcMain.handle("login", async () => {
    // 主进程响应login
    // mock
    let code = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    console.log("code: ", code);
    return code;
  });
  ipcMain.on("control", async (e, remoteCode) => {
    // 服务端交互 mock返回
    sendMainWindow("control-state-change", remoteCode, 1);
    createControlWindow();
  });
};
