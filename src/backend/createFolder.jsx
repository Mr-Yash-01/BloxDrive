export const createFolder = async (newFolderName, contractInstance, path, account, folderData) => {
    try {
        // Check if the new folder name already exists in folderData
        if (folderData.folders && folderData.folders.some((folder) => folder.name === newFolderName)) {
            alert('Folder already exists');
            return false; // Indicate failure as the folder already exists
        }

        console.log("Initiating folder creation...");
        console.log("New folder name:", newFolderName);

        // Initiating the transaction
        const transaction = await contractInstance.createFolder(path, newFolderName, account);
        console.log("Transaction sent:", transaction);

        // Wait for the transaction receipt
        const receipt = await transaction.wait();
        console.log("Transaction receipt:", receipt);

        if (receipt.status) {
            console.log("Folder creation successful!");
            return true; // Transaction succeeded
        } else {
            console.error("Transaction failed on-chain.");
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
