export const createFolder = async (newFolderName, contractInstance,path,account,folderData ) => {
    try {
        // Check if the new folder name already exists in folderData
        if (folderData.folders && folderData.folders.some((folder) => folder.name === newFolderName)) {
            alert('Folder already exists');
            return;
        }

        const createFolder = await contractInstance.createFolder(path, newFolderName, account);
        const receipt = await createFolder.wait();

        return receipt.status;
    } catch (error) {
        console.error("Error creating folder:", error);
    }
}