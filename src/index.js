import "./styles.css"
import DOMManager from "./domManager.js";
import DataHandler from "./dataHandler.js";

const dataHandler = new DataHandler();
const domManager = new DOMManager(dataHandler);

dataHandler.createNewItem("Test Item",new Date());
dataHandler.createNewItem("Test Item",new Date());
dataHandler.createNewItem("Test Item",new Date());
dataHandler.createNewGroup("Second Group");
domManager.updateMainContent();
domManager.updateSidebar();