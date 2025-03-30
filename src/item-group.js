export default class ItemGroup {
    constructor(name,description) {
        this._id = crypto.randomUUID();
        this.name = name;
        this.description = description;
        this.contents = new Array();
    }

    get id() {
        return this._id;
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
        const mainGroupArr = [];
        for (const item of this.contents) {
            if (item instanceof ItemGroup) {
                console.log("entered IF")
                const contentsArr = new Array();
                for (const subItem of item.contents) {
                    contentsArr.push(subItem);
                }
                const subItemOutput = {id:item.id, name:item.name, description:item.description, contents:contentsArr}
                console.log(subItemOutput);
                mainGroupArr.push(JSON.stringify(subItemOutput));
            } else {
                mainGroupArr.push(JSON.stringify(item));
            }
        }
        console.log(`mainGroupArr ${mainGroupArr}`);
        const jsonOutput = {id:this.id, name:this.name, description:this.description, contents:mainGroupArr};
        return JSON.stringify(jsonOutput);
    }
}