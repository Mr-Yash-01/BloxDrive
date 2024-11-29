export async function getFolderData(contractInstance, path, account) {
    try {
        // Fetch the folder data from the smart contract
        let folderData = await contractInstance.getFolderData(path, account);

        // Ensure the data is in the expected format (stringified JSON) before parsing
        if (typeof folderData === 'string') {
            folderData = JSON.parse(folderData);
        } else {
            console.error('Invalid data format received:', folderData);
            return null;  // Return null if the data format is unexpected
        }

        return folderData;
    } catch (error) {
        console.error("Error fetching folder data:", error);
        return null;  // Return null in case of an error
    }
}
