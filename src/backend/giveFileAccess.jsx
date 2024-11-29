export async function giveFileAccess(account, toAddress, selectedFileManuplation, contractInstance) {
    try {
        // Destructure selectedFileManuplation to extract file details
        const { name, cid, size, createdAt, fileType } = selectedFileManuplation;

        // Call the contract function to give access to the file
        const res = await contractInstance.giveFileAccess(
            account,
            toAddress,
            name,
            cid,
            size,
            createdAt,
            fileType
        );

        // Wait for the transaction to be mined and get the receipt
        const receipt = await res.wait();

        // Check if the transaction was successful (status === 1)
        if (receipt.status === 1) {
            return true;  // Return true if successful
        } else {
            return false;  // Return false if the transaction failed
        }
    } catch (error) {
        // Log the error if it occurs
        console.error('Error during file access operation:', error);
        return false;  // Return false if an error occurs
    }
}
