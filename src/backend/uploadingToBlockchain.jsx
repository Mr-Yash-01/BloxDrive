export const uploadToBlockchain = async (uploadingFilesBlockChain, contractInstance, path, account) => {
    try {
        
        // Initiating the transaction
        const transaction = await contractInstance.createFiles(path, uploadingFilesBlockChain, account);
        
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
        return false;
    }
};
