export function formatFiletype(fileType) {
    if (fileType.includes('/')) {
        return fileType.split('/').pop();
    } else {
        return fileType;
    }
}