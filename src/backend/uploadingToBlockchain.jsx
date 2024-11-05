export const uploadToBlockchain = async (uploadingFilesBlockChain,contractInstance,path,account) => {
    try {
        console.log("Uploading to blockchain...");
        console.log("Uploading files:", uploadingFilesBlockChain);

        const res = await contractInstance.createFiles(path, uploadingFilesBlockChain, account);
        console.log("Transaction sent:", res);

        const receipt = await res.wait();
        return receipt.status;

    } catch (error) {
        console.error("Error uploading to blockchain:", error);

    }
};