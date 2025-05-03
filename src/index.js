import "./styles.css"
import DOMManager from "./domManager.js";
import DataHandler from "./dataHandler.js";
import parseISO from 'date-fns/parseISO'

const dataHandler = new DataHandler();
const domManager = new DOMManager(dataHandler);

dataHandler.createNewItem("Test Item 1","2026-05-30","Some description text to describe the task.");
dataHandler.createNewItem("Test Item 2","2026-05-30");
dataHandler.createNewItem("Test Item 3","2026-05-30");
dataHandler.createNewItem("Overdue","2024-05-30");
const newGroupID = dataHandler.createNewGroup("Second Group");
dataHandler.activeGroup = newGroupID;
dataHandler.createNewItem("2nd Group Item","2026-05-30","A short description for test");
dataHandler.createNewItem("2nd Group Item 2","2026-05-30");
domManager.updateMainContent();
domManager.updateSidebar();