export const uploadToBlockchain = async (uploadingFilesBlockChain, contractInstance, path, account) => {
    try {
        console.log("Initiating upload to blockchain...");
        console.log("Files to upload:", uploadingFilesBlockChain);

        // Initiating the transaction
        const transaction = await contractInstance.createFiles(path, uploadingFilesBlockChain, account);
        console.log("Transaction sent:", transaction);

        // Wait for the transaction receipt
        const receipt = await transaction.wait();
        console.log("Transaction receipt:", receipt);

        if (receipt.status) {
            console.log("Upload successful!");
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
        console.error("Error uploading to blockchain:", error.message || error);
        return false;
    }
};
