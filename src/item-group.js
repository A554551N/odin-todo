export default class ItemGroup {
    constructor(groupName,id=crypto.randomUUID(),description="") {
        this.id = id;
        this.group = true;
        // this exists to inform the previous version of the serialize/deserialize method
        // that it's an ItemGroup (reserialized objects lose their instanceof result)
        this.groupName = groupName;
        this.description = description;
        this.contents = new Array();
    }

    addToGroup(itemToAdd) {
        this.contents.push(itemToAdd);
    }

    deleteFromGroup(itemID) {
        for (let i = 0; i < this.contents.length; i++) {
            if (this.contents[i].id === itemID) {
                this.contents.splice(i,1);
                return true;
            }
            return false;
        }
    }

    getFromGroup(itemID) {
        for (let i = 0; i < this.contents.length; i++) {
            if (this.contents[i].id === itemID) {
                return this.contents[i];
            }
        }
    }

    updateGroup(itemToUpdate) {
        this.deleteFromGroup(itemToUpdate.id);
        this.addToGroup(itemToUpdate);
    }
}