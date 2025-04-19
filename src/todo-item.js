export default class ToDoItem {
    constructor(title,description="",dueDate,priorityValue=1,isComplete=false,id=crypto.randomUUID()) {
        this.id = id;
        this.title = title
        this.description = description
        this.dueDate = dueDate
        // date is going to be a bear, always is.  For now I'll take the date from the 
        // form as it comes, but this will likely eat up a lot of my time later. 
        
        this.priorityValue = priorityValue
        // I'm choosing to store the priority as a 3 step value (1 is normal,
        // 2 is high, 3 is critical)
        // I'll probably have a get function further down that returns a text expression for
        // use in other elements of the app.
        this._priorityLevels = {
            1: "Normal",
            2: "High",
            3: "Critical",
        }
        this.isComplete = isComplete;
    }

    get priority() {
        return this._priorityLevels[this.priorityValue]
    }

    set priority(priorityString) {
        const sanitizedPriorityString = priorityString.toLowerCase();
        const priorityLevels = {
            "normal": 1,
            "high": 2,
            "critical": 3
        }
        this.priorityValue = priorityLevels[sanitizedPriorityString];
    }
    get priorityLevels() {
        return this._priorityLevels;
    }
    serialize() {
        const objToSerialize = {title:this.title,
            description:this.description,
            dueDate:this.dueDate,
            priorityValue:this.priorityValue,
            isComplete:this.isComplete,
            id:this.id}
        return JSON.stringify(objToSerialize)
    }
}
/*
I'm going to include comment notes on this module while I build it, and then remove them at the end.
This is the basic item, a ToDoItem.  It holds all of the data of a single to-do element.

Currently, properties can be set directly by other elements, but my suspicion is that I'll need
a set method on the date at some point.

I want to include as little logic on this class as possible because I would prefer if these could be directly serialized.

I'd like to make it so that priorityLevel is only defined once and inverted as needed.
*/