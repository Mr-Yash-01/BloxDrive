export const createFolder = async (newFolderName, contractInstance, path, account, folderData) => {
    try {
        // Check if the new folder name already exists in folderData
        if (folderData.folders && folderData.folders.some((folder) => folder.name === newFolderName)) {
            alert('Folder already exists');
            return false; // Indicate failure as the folder already exists
        }

        

        // Initiating the transaction
        const transaction = await contractInstance.createFolder(path, newFolderName, account);
        
        // Wait for the transaction receipt
        const receipt = await transaction.wait();
        
        if (receipt.status) {
            return true; // Transaction succeeded
        } else {
            return false; // Transaction failed on-chain
        }
    } catch (error) {
        // Handle specific user rejection error
        if (error.code === 4001 || error.reason === "rejected") {
            return false; // Return a clear failure status
        }

        // Handle other potential errors
        console.error("Error creating folder:", error.message || error);
        return false;
    }
};
