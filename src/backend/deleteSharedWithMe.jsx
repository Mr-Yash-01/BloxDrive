export async function deleteSharedWithMe(contractInstance, cid, account) {
    try {
        console.log(`Initiating deletion of shared file with CID: ${cid}`);

        // Interact with the smart contract to remove the file from "shared with me"
        const transaction = await contractInstance.removeFileByFieldAndCid(cid, account);
        console.log("Transaction sent:", transaction);

        // Wait for the transaction to be mined
        const receipt = await transaction.wait();
        console.log("Transaction receipt:", receipt);

        if (receipt.status === 1) {
            console.log(`File with CID: ${cid} successfully deleted from shared files.`);
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
        console.error("An unexpected error occurred during file deletion from shared with me:", error.message || error);
        return false;
    }
}
