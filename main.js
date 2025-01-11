const obsidian = require("obsidian");
const {Tray, Menu, getCurrentWindow, BrowserWindow} = require("electron").remote;
const path = require("path");


const win = getCurrentWindow();

module.exports = class TrayPlugin extends obsidian.Plugin {
	async onload() {
		createTrayIcon();
		window.addEventListener("beforeunload", (event) => event.preventDefault());
		win.on("close", (event) => {
			event.preventDefault();
			win.hide();
		});
	}
}

const createTrayIcon = () => {
	const tray = new Tray(path.join(__dirname, "../../obsidian.asar/icon.png"));
	const contextMenu = Menu.buildFromTemplate([
		{label: "Quit", click: () => win.destroy()},
	]);
	tray.setContextMenu(contextMenu);
	tray.setToolTip("Obsidian");
	tray.on("click", () => {
		win.isVisible() ? win.hide() : win.show();
	});
};