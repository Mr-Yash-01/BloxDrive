export async function deleteSharedToPeople(contractInstance, cid, account) {
    try {
        console.log(`Initiating deletion of shared file with CID: ${cid}`);

        // Interact with the smart contract to delete the file from shared storage
        const transaction = await contractInstance.deleteFileFromSharedToPeople(cid, account);
        console.log("Transaction sent:", transaction);

        // Wait for the transaction to be mined
        const receipt = await transaction.wait();
        console.log("Transaction receipt:", receipt);

        if (receipt.status === 1) {
            console.log(`Shared file with CID: ${cid} successfully deleted.`);
            return true; // Deletion succeeded
        } else {
            console.error("Error: Transaction failed on-chain.");
            return false; // Deletion failed
        }
    } catch (error) {
        // Specific error handling for transaction rejection
        if (error.code === 4001 || error.message.includes('rejected')) {
            console.warn("User rejected the deletion transaction.");
            return false; // User rejection
        }

        // General error handling for unexpected issues
        console.error("An unexpected error occurred during shared file deletion:", error.message || error);
        return false;
    }
}
