export async function deleteFile(account, path, fileName, cid, pinata, contractInstance) {  
    try {
        // Unpin the file using the Pinata SDK
        console.log(cid);
        const unpinResult = await pinata.unpin([cid]); // Pass cid as a string, not an array
        
        console.log('Unpin result:', unpinResult);

        if (unpinResult[0].status === 'OK') {
            console.log('File Unpinned Successfully');

            // Delete the file from the smart contract storage
            const response = await contractInstance.deleteFile(path, fileName,cid, account);
            const receipt = await response.wait();

            console.log('Delete file receipt:', receipt);

            if (receipt.status === 1) {
                return true;
            } else {
                console.log('Error in Deleting File');
            }
        } else {
            console.log('Error in Unpinning File');
        }
    } catch (error) {
        console.error('Error during file deletion process:', error);
    }
}
