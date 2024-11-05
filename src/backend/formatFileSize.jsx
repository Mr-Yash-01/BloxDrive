export const formatFileSize = (sizeInBytesString) => {
    // Convert the string to an integer
    const sizeInBytes = parseInt(sizeInBytesString, 10);

    if (sizeInBytes < 1024) {
        return sizeInBytes + ' Bytes';
    } else if (sizeInBytes < 1024 * 1024) {
        return (sizeInBytes / 1024).toFixed(2) + ' KB';
    } else {
        return (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
};

