import "./styles.css"
import DOMManager from "./domManager.js";
import DataHandler from "./dataHandler.js";

const dataHandler = new DataHandler();
const domManager = new DOMManager(dataHandler);

dataHandler.createNewItem("Test Item 1",new Date(),"Some description text to describe the task.");
dataHandler.createNewItem("Test Item 2",new Date());
dataHandler.createNewItem("Test Item 3",new Date());
const newGroupID = dataHandler.createNewGroup("Second Group");
dataHandler.activeGroup = newGroupID;
dataHandler.createNewItem("2nd Group Item",new Date(),"A short description for test");
dataHandler.createNewItem("2nd Group Item 2",new Date());
domManager.updateMainContent();
domManager.updateSidebar();