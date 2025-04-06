import "./styles.css"
import DOMManager from "./domManager.js";
import DataHandler from "./dataHandler.js";

const dataHandler = new DataHandler();
const domManager = new DOMManager(dataHandler);

dataHandler.createNewItem("Test Item",new Date(),"Some description text to describe the task.");
dataHandler.createNewItem("Test Item",new Date());
dataHandler.createNewItem("Test Item",new Date());
const newGroupID = dataHandler.createNewGroup("Second Group");
dataHandler.activeGroup = newGroupID;
dataHandler.createNewItem("2nd Group",new Date());
dataHandler.createNewItem("2nd Group 2",new Date());
domManager.updateMainContent();
domManager.updateSidebar();