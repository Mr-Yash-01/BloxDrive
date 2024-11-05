export async function deleteSharedToPeople(contractInstance, cid, account) {
    try {
        const res = await contractInstance.deleteFileFromSharedToPeople(cid,account);
        const receipt = await res.wait();
        if(receipt.status === 1){
            return true;
        } else {
            console.log('Error in Deleting Shared File');
        }
    } catch (error) {
        console.log('Error in Deleting Shared File:', error);
        
    }
}