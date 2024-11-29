export async function deleteFolder(contractInstance, path, folderName, account) {
    try {
        
        // Interact with the smart contract to delete the folder
        const transaction = await contractInstance.deleteFolder(path, folderName, account);
    

        // Wait for the transaction receipt
        const receipt = await transaction.wait();
        
        if (receipt.status === 1) {
            return true; // Folder deletion succeeded
        } else {
            console.error("Error: Transaction failed on-chain.");
            return false; // Folder deletion failed
        }
    } catch (error) {
        // Specific error handling for transaction rejection
        if (error.code === 4001 || error.message.includes('rejected')) {
            console.warn("User rejected the folder deletion transaction.");
            return false; // User rejection
        }

        // General error handling
        console.error("An unexpected error occurred during folder deletion:", error.message || error);
        return false;
    }
}
