import { uploadFile } from "./uploadFile";

export const manageUpload = async (pinata, files) => {
    try {

        const uploadingFilesBlockChain = [];
        for (const file of files) {
            const res = await uploadFile(pinata, file); 
            console.log("File uploaded:", file.name, res);

            const tempFileObject = {
                name: file.name,
                cid: res.IpfsHash,
                size: file.size,
                fileType: file.type,
            }

            uploadingFilesBlockChain.push(tempFileObject);

        }
        return { success: true, files: uploadingFilesBlockChain };
    } catch (error) {
        console.error("Error managing upload:", error);
    }
};