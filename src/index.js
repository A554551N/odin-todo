import "./styles.css"
import ToDoItem from "./todo-item.js"

console.log("Loaded")

const testItem = new ToDoItem("Test","A Test Item",new Date(),3);
console.table(testItem);
console.log(`Priority: ${testItem.priority}`)
testItem.priority = "HIGH"
console.log(`Priority: ${testItem.priority}`)