import "./styles.css"
import ToDoItem from "./todo-item.js"
import ItemGroup from "./item-group.js";
import {save,load} from "./dataManagement.js";

if (localStorage.archive) {
    load();
    console.log("Save Data Found");
} else {
    save(masterGroup.serialize());
}
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
masterGroup.addToGroup(itemGroup);
//console.table(itemGroup);
//console.table(itemGroup);

const testSaveString = masterGroup.serialize();
console.log(masterGroup.contents[0].contents[0].title);
save(testSaveString);
masterGroup.contents[0].contents[0].title = "POOP";
console.log(masterGroup.contents[0].contents[0].title);
masterGroup = load();
console.log(masterGroup.contents[0].contents[0].title);
