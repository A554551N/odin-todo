import "./styles.css"
import ToDoItem from "./todo-item.js"
import ItemGroup from "./item-group.js";

const itemGroup = new ItemGroup("Test Group","Some Sample Elements");
const masterGroup = new ItemGroup("Master Group","");
const testItem = new ToDoItem("Test","A Test Item",new Date(),3);
const testTwo = new ToDoItem("Test 2","A Second Test",new Date(),1);
itemGroup.addToGroup(testItem);
itemGroup.addToGroup(testTwo);

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
console.log(itemGroup.serialize());