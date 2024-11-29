export const uploadFile = async (pinata, file) => {
    try {
        // Upload the file to Pinata
        const res = await pinata.upload.file(file);

        // Log the response for debugging
        console.log("File uploaded successfully:", res);

        // Check if the upload was successful
        if (res && res.IpfsHash) {
            return { success: true, IpfsHash: res.IpfsHash };
        } else {
            console.error("Error: IPFS Hash not found in response");
            return { success: false, error: "IPFS Hash not found in response" };
        }
    } catch (error) {
        // Log the error if the upload fails
        console.error("Error uploading file:", error);
        
        // Return a failure response
        return { success: false, error: error.message };
    }
};
