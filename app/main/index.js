const { app } = require("electron");
const { create: createMainWindow } = require("./windows/main");
const handleIpc = require("./ipc");

app.on("ready", () => {
  handleIpc();
  createMainWindow();
});
