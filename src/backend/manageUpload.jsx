import { uploadFile } from "./uploadFile";

export const manageUpload = async (pinata, files) => {
    try {
        const uploadingFilesBlockChain = [];

        // Loop through each file in the files array
        for (const file of files) {
            // Upload each file using the uploadFile function
            const res = await uploadFile(pinata, file);

            // Check if the upload was successful and handle errors
            if (!res || !res.IpfsHash) {
                console.log(`Error: Upload failed for file ${file.name}`);
                continue;  // Skip to the next file if upload fails
            }

            console.log("File uploaded:", file.name, res);

            // Prepare file metadata object
            const tempFileObject = {
                name: file.name,
                cid: res.IpfsHash,  // IPFS hash of the uploaded file
                size: file.size,    // File size in bytes
                fileType: file.type,  // MIME type of the file
            };

            // Add the file metadata to the blockchain files array
            uploadingFilesBlockChain.push(tempFileObject);
        }

        // Return a success response with the uploaded files' metadata
        return { success: true, files: uploadingFilesBlockChain };

    } catch (error) {
        console.error("Error managing upload:", error);
        return { success: false, error: error.message };  // Return failure status and error message
    }
};
