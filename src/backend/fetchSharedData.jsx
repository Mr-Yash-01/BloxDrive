export async function fetchSharedData(contractInstance, account) {
    try {
        const response = await contractInstance.getSharedData(account);
        
        return response;
    } catch (error) {
        console.error('Error in fetching shared data:', error);
    }
}