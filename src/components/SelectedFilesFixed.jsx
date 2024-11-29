import React, { useState } from 'react';
import { CiFileOn } from 'react-icons/ci';
import { ImFilesEmpty } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { SlCloudUpload } from 'react-icons/sl';
import { manageUpload } from '../backend/manageUpload';
import { uploadToBlockchain } from '../backend/uploadingToBlockchain';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
    contractAtom,
    currentAccountAtom,
    folderDataAtom,
    pathAtom,
    pinataAtom,
    selectedFilesAtom,
    uploadingStatusAtom,
} from '../store/atoms/commonLegends';
import { getFolderData } from '../backend/getFolderData';

const SelectedFilesFixed = () => {
    const path = useRecoilValue(pathAtom);
    const account = useRecoilValue(currentAccountAtom);
    const [folderData, setFolderData] = useRecoilState(folderDataAtom);
    const [selectedFiles, setSelectedFiles] = useRecoilState(selectedFilesAtom);
    const [uploadingStatus, setUploadingStatus] = useRecoilState(uploadingStatusAtom);
    const contractInstance = useRecoilValue(contractAtom);
    const pinata = useRecoilValue(pinataAtom);

    const [uploadStep, setUploadStep] = useState(null); // To track the current upload step

    const handleUpload = async () => {
        setUploadingStatus(true);
        setUploadStep('Uploading file');

        try {
            // Step 1: Upload to Pinata
            const pinataResponse = await manageUpload(pinata, selectedFiles);
            if (!pinataResponse) {
                setUploadingStatus(false);
                setUploadStep(null);
                alert('Transaction rejected by user!');
                return;
            }

            if (pinataResponse.success) {
                setUploadStep('Writting on chain');
                // Step 2: Upload to Blockchain
                const blockchainUpload = await uploadToBlockchain(
                    pinataResponse.files,
                    contractInstance,
                    path,
                    account
                );

                if (blockchainUpload) {
                    setSelectedFiles(null);
                } else {
                    alert('Upload rejected by User!');
                }
            }

            // Refresh folder data
            const updatedData = await getFolderData(contractInstance, path, account);
            setFolderData(updatedData);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('An unexpected error occurred.');
        } finally {
            setUploadingStatus(false);
            setUploadStep(null); // Reset upload step
        }
    };

    return (
        <div>
            <div className="hidden lg:block mt-4 rounded-xl shadow-[#105682] overflow-hidden shadow-sm bg-[#131314]">
                <div className="flex px-2 bg-[#105682] items-center">
                    <ImFilesEmpty className="w-6 h-6" />
                    <h1 className="bg-[#105682] p-2 text-xl">Selected Files</h1>
                    <button onClick={() => setSelectedFiles(null)} className="items-center ml-auto">
                        <IoMdClose className="w-6 h-6" />
                    </button>
                </div>
                {selectedFiles.map((file, index) => (
                    <div key={index} className="px-2 my-2 text-lg">
                        <div className="flex items-center">
                            <CiFileOn className="w-5 h-5" />
                            <h1 className="text-lg px-2">{file.name}</h1>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-4">
                {!uploadingStatus ? (
                    <button
                        onClick={handleUpload}
                        className="flex flex-row hover:bg-[#13415e] items-center w-fit p-4 shadow-black bg-[#105682] rounded-xl"
                    >
                        <SlCloudUpload className="w-6 h-6" />
                        <span className="ml-2">Upload</span>
                    </button>
                ) : (
                    <button className="flex flex-row items-center w-fit p-4 shadow-black bg-[#105682] rounded-xl">
                        <span className="loader w-6 h-6" />
                        <span className="ml-2">{uploadStep || 'Uploading...'}</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SelectedFilesFixed;
