export async function deleteSharedToPeople(contractInstance, cid, account) {
    try {
        
        // Interact with the smart contract to delete the file from shared storage
        const transaction = await contractInstance.deleteFileFromSharedToPeople(cid, account);
        
        // Wait for the transaction to be mined
        const receipt = await transaction.wait();
        
        if (receipt.status === 1) {
            return true; // Deletion succeeded
        } else {
            return false; // Deletion failed
        }
    } catch (error) {
        // Specific error handling for transaction rejection
        if (error.code === 4001 || error.message.includes('rejected')) {
            return false; // User rejection
        }

        // General error handling for unexpected issues
        return false;
    }
}
