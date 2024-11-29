export async function deleteSharedWithMe(contractInstance, cid, account) {
    try {
        
        // Interact with the smart contract to remove the file from "shared with me"
        const transaction = await contractInstance.removeFileByFieldAndCid(cid, account);
        
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
