export default class ItemGroup {
    constructor(groupName,id=crypto.randomUUID(),description="") {
        this.id = id;
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

    serialize() {
        const objToSerialize = {
            id: this.id,
            groupName: this.groupName,
            description: this.description,
            contents: new Array()
        }
        for (const element of this.contents) {
            objToSerialize.contents.push(element.serialize());
        }
        return JSON.stringify(objToSerialize);
    }
}