export const formatFileSize = (sizeInBytesString) => {
    // Convert the input string to an integer
    const sizeInBytes = parseInt(sizeInBytesString, 10);

    // Check if the input is a valid number
    if (isNaN(sizeInBytes) || sizeInBytes < 0) {
        return "Invalid size";  // Return a message for invalid input
    }

    // Format the size based on different thresholds
    if (sizeInBytes < 1024) {
        return sizeInBytes + ' Bytes';
    } else if (sizeInBytes < 1024 * 1024) {
        return (sizeInBytes / 1024).toFixed(2) + ' KB';
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
        return (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else if (sizeInBytes < 1024 * 1024 * 1024 * 1024) {
        return (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    } else {
        return (sizeInBytes / (1024 * 1024 * 1024 * 1024)).toFixed(2) + ' TB';
    }
};
