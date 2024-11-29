export function formatFiletype(fileType) {
    // Check if the fileType is a valid string
    if (typeof fileType !== 'string' || !fileType) {
        return 'Unknown type';  // Return a fallback value for invalid input
    }

    // Check if the fileType contains a '/'
    if (fileType.includes('/')) {
        return fileType.split('/').pop(); // Return the part after the '/'
    } else {
        return fileType; // Return the fileType as is if it doesn't contain a '/'
    }
}
