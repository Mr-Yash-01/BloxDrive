export async function fetchSharedData(contractInstance, account) {
    try {
        console.log(`Fetching shared data for account: ${account}`);
        
        // Fetch the shared data from the contract
        const response = await contractInstance.getSharedData(account);
        console.log("Shared data retrieved:", response);
        
        return response;  // Return the fetched data if successful
    } catch (error) {
        // Handling user rejection if the error contains 'rejected' or code 4001
        if (error.code === 4001 || error.message.includes('rejected')) {
            console.warn("User rejected the request.");
            return null;  // Return null if the user rejected the transaction
        }

        // General error handling for unexpected issues
        console.error("An unexpected error occurred while fetching shared data:", error.message || error);
        return null;  // Return null for any unexpected error
    }
}
