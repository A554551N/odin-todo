function save(serializedMaster) {
    localStorage.setItem("archive",serializedMaster);
}

function load() {
    const archiveToRestore = localStorage.getItem("archive");
    console.log(archiveToRestore);
}

export {save,load};