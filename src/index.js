import "./styles.css"
import DOMManager from "./domManager.js";
import ToDoItem from "./todo-item.js"
import ItemGroup from "./item-group.js";
import {save,load} from "./dataManagement.js";

if (localStorage.archive) {
    load();
    console.log("Save Data Found");
} else {
    save(masterGroup.serialize());
}
const domManager = new DOMManager();
const itemGroup = new ItemGroup("Test Group","Some Sample Elements");
let masterGroup = new ItemGroup("Master Group","");
const testItem = new ToDoItem("Test","A Test Item",new Date(),3);
const testTwo = new ToDoItem("Test 2","A Second Test",new Date(),1);
itemGroup.addToGroup(testItem);
itemGroup.addToGroup(testTwo);
masterGroup.addToGroup(itemGroup);
//console.table(itemGroup);

const returnedItem = itemGroup.getFromGroup(testItem.id);

if (returnedItem === testItem) {
    //console.log("Returned True");
}

returnedItem.title = "Updated Title";
itemGroup.updateGroup(returnedItem);
testItem.priorityValue = 2;
domManager.updateMainContent(itemGroup.contents);
console.table(masterGroup.contents);
domManager.updateSidebar(masterGroup.contents);