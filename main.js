const obsidian = require("obsidian");
const {app, Tray, Menu, getCurrentWindow, BrowserWindow} = require("electron").remote;
const path = require("path");


const win = getCurrentWindow();

app.on("second-instance", (e) => {
	const win2 = BrowserWindow.getAllWindows()[0];

	win2.setOpacity(0.0); // prevents "flashing" (quick open->close Obsidian start window)
	win2.once("ready-to-show", () => {
		win2.close();
	});

	win.show();
	win.focus();
});

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