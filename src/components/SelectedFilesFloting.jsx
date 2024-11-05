import React from 'react'
import { CiFileOn } from 'react-icons/ci';
import { ImFilesEmpty } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { SlCloudUpload } from 'react-icons/sl';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { contractAtom, currentAccountAtom, folderDataAtom, pathAtom, selectedFilesAtom, uploadingStatusAtom, pinataAtom } from '../store/atoms/commonLegends';
import { getFolderData } from '../backend/getFolderData';
import { uploadToBlockchain } from '../backend/uploadingToBlockchain';
import { manageUpload } from '../backend/manageUpload';

const SelectedFilesFloting = () => {

    const [selectedFiles, setSelectedFiles] = useRecoilState(selectedFilesAtom);
    const setFolderData = useSetRecoilState(folderDataAtom);
    const account = useRecoilValue(currentAccountAtom);
    const path = useRecoilValue(pathAtom);
    const contractInstance = useRecoilValue(contractAtom);
    const [uploadingStatus, setUploadingStatus] = useRecoilState(uploadingStatusAtom) 


    return (
        <div className='absolute bottom-1/3 right-1/3 lg:hidden'>
            <div className=' lg:hidden mt-4 rounded-xl shadow-[#105682] overflow-hidden shadow-sm bg-[#131314]'>
                <div className='flex px-2  bg-[#105682] items-center'>
                    <ImFilesEmpty className='w-6 h-6' />
                    <h1 className='bg-[#105682] p-2 text-xl'>
                        Selected Files
                    </h1>
                    <button onClick={() => setSelectedFiles(null)} className='items-center ml-auto '>
                        <IoMdClose className='w-6 h-6 ' />
                    </button>
                </div>
                {selectedFiles.map((file, index) => (
                    <div key={index} className='px-2 my-2 text-lg'>
                        <div className='flex items-center'>
                            <CiFileOn className='w-5 h-5' />
                            <h1 className='text-lg px-2'>{file.name}</h1>
                        </div>
                    </div>
                ))}
            </div>
            {!uploadingStatus ?
                <button onClick={async () => {
                    setUploadingStatus(true);
                    const res = await manageUpload(selectedFiles, pinataAtom);

                    if (res.success) {
                        const response = await uploadToBlockchain(res.files,contractInstance,path,account);
                        if (response) {
                            setUploadingStatus(false);
                            setSelectedFiles(null);
                        }
                    }
                    const data = await getFolderData(contractInstance, path, account);
                    setFolderData(data);
                }} className={`flex flex-row  justify-self-center w-fit  p-4 shadow-black items-center shadow-md justify-items-center bg-[#105682] rounded-xl  mt-4  `} >

                    <SlCloudUpload className="w-6 h-6" />

                </button> :
                <button className={`flex flex-row  justify-self-center w-fit  p-4 shadow-black items-center shadow-md justify-items-center bg-[#105682] rounded-xl  mt-4  `} >

                    <span className="w-6 h-6 loader" />

                </button>
            }
        </div>
    )
}

export default SelectedFilesFloting