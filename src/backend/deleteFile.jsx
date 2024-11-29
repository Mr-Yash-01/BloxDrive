export async function deleteFile(account, path, fileName, cid, pinata, contractInstance) {
    try {
        
        // Step 1: Unpin the file using the Pinata SDK
        const unpinResult = await pinata.unpin(cid); // Correct usage of `cid` as a string
        
        if (unpinResult.status !== 'OK') {
            console.error('Failed to unpin the file from Pinata.');
            return false; // Exit early if unpinning fails
        }

        
        // Step 2: Interact with the smart contract to delete the file from blockchain storage
        const transaction = await contractInstance.deleteFile(path, fileName, cid, account);

        // Wait for the transaction receipt
        const receipt = await transaction.wait();
        
        if (receipt.status === 1) {
            return true;
        } else {
            console.error('Transaction failed. File could not be deleted on-chain.');
            return false;
        }
    } catch (error) {
        // Specific error handling for transaction rejection
        if (error.code === 4001 || error.message.includes('rejected')) {
            console.warn('User rejected the transaction.');
            return false;
        }

        // General error handling
        console.error('An unexpected error occurred during file deletion:', error.message || error);
        return false;
    }
}
