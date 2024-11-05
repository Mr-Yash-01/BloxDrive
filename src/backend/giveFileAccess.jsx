export async function giveFileAccess(account, toAddress, selectedFileManuplation ,contractInstance) {
    try {
        const res = await contractInstance.giveFileAccess(account,toAddress,selectedFileManuplation.name,selectedFileManuplation.cid,selectedFileManuplation.size,selectedFileManuplation.createdAt,selectedFileManuplation.fileType);
        const receipt = await res.wait();

        if(receipt.status === 1){
            return true;
        } else {
            console.log('Error in Giving File Access');
        }

    } catch (error) {
        
    }
}