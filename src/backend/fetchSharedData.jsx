export async function fetchSharedData(contractInstance, account) {
    try {
        
        // Fetch the shared data from the contract
        const response = await contractInstance.getSharedData(account);
        
        return response;  // Return the fetched data if successful
    } catch (error) {
        // Handling user rejection if the error contains 'rejected' or code 4001
        if (error.code === 4001 || error.message.includes('rejected')) {
            return null;  // Return null if the user rejected the transaction
        }

        // General error handling for unexpected issues
        return null;  // Return null for any unexpected error
    }
}
