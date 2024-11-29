export async function deleteFile(account, path, fileName, cid, pinata, contractInstance) {
    try {
        console.log(`Initiating deletion process for file: ${fileName} at path: ${path}`);

        // Step 1: Unpin the file using the Pinata SDK
        const unpinResult = await pinata.unpin(cid); // Correct usage of `cid` as a string
        console.log('Unpin result:', unpinResult);

        if (unpinResult.status !== 'OK') {
            console.error('Failed to unpin the file from Pinata.');
            return false; // Exit early if unpinning fails
        }

        console.log('File successfully unpinned from Pinata.');

        // Step 2: Interact with the smart contract to delete the file from blockchain storage
        console.log('Attempting to delete file from blockchain...');
        const transaction = await contractInstance.deleteFile(path, fileName, cid, account);

        // Wait for the transaction receipt
        const receipt = await transaction.wait();
        console.log('Transaction receipt:', receipt);

        if (receipt.status === 1) {
            console.log('File successfully deleted on-chain.');
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
