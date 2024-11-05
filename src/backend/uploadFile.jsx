export const uploadFile = async (pinata, file) => {
    try {
        const res = await pinata.upload.file(file);
        console.log(res);
        
        return res;
    } catch (error) {
        console.error("Error uploading file:", error);
    }
};