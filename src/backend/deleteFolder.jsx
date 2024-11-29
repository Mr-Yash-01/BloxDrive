export async function deleteFolder(contractInstance, path, folderName, account) {
    try {
        console.log(`Initiating folder deletion: ${folderName} at path: ${path}`);

        // Interact with the smart contract to delete the folder
        const transaction = await contractInstance.deleteFolder(path, folderName, account);
        console.log("Transaction sent:", transaction);

        // Wait for the transaction receipt
        const receipt = await transaction.wait();
        console.log("Transaction receipt:", receipt);

        if (receipt.status === 1) {
            console.log(`Folder "${folderName}" successfully deleted.`);
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
