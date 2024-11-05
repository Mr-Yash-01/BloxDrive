export async function getFolderData(contractInstance,path,account) {
    try {
        let folderData = await contractInstance.getFolderData(path, account);
        console.log('Folder Data:', folderData);
        folderData = JSON.parse(folderData);
        return folderData;
        // Handle the fetched folder data (e.g., update state, display data)
    } catch (error) {
        console.error("Error fetching folder data:", error);
    }
}