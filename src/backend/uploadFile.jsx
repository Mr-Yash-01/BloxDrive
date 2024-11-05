import { pinataAtom } from "../store/atoms/commonLegends";
export const uploadFile = async (file) => {
    try {
        const res = await pinataAtom.upload.file(file);
        return res;
    } catch (error) {
        console.error("Error uploading file:", error);
    }
};