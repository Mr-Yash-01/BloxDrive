import React from "react";

export async function deleteFolder(contractInstance, path, folderName, account) {

    try {
        const res = await contractInstance.deleteFolder(path, folderName, account);
        const receipt = await res.wait();
        if (receipt.status === 1) {
            return true;
        } else {
            console.log('Error in Deleting Folder');
        }
    } catch (error) {
        console.log('Error in Deleting Folder:', error);
        
    }

}