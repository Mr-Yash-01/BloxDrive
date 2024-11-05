import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { contractAtom, currentAccountAtom, folderDataAtom, isCreateFolderTappedAtom, isFolderCreatingAtom, newFolderNameAtom, pathAtom } from '../store/atoms/commonLegends';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { ImFilesEmpty } from 'react-icons/im';
import { SlCloudUpload } from 'react-icons/sl';
import { createFolder } from '../backend/createFolder';
import { getFolderData } from '../backend/getFolderData';

const NewFolderNameInputFloting = () => {

    const [newFolderName, setNewFolderName] = useRecoilState(newFolderNameAtom);
    const [isFolderCreating, setIsFolderCreating] = useRecoilState(isFolderCreatingAtom);
    const contractInstance = useRecoilValue(contractAtom);
    const [isCreateFolderTapped, setIsCreateFolderTapped] = useRecoilState(isCreateFolderTappedAtom);
    const path = useRecoilValue(pathAtom);
    const account = useRecoilValue(currentAccountAtom);
    const [folderData, setFolderData] = useRecoilState(folderDataAtom);


    return (
        <div className='absolute bottom-1/3 right-1/3 lg:hidden'>
            <div className=' lg:hidden mt-4 rounded-xl shadow-[#105682] overflow-hidden shadow-sm bg-[#131314]'>
                <div className='flex px-2  bg-[#105682] items-center'>
                    <ImFilesEmpty className='w-6 h-6' />
                    <h1 className='bg-[#105682] p-2 text-xl'>
                        Folder Name
                    </h1>
                    <button onClick={() => {
                        setIsCreateFolderTapped(false);                        
                        }} className='items-center ml-auto '>
                        <IoMdClose className='w-6 h-6 ' />
                    </button>
                </div>
                <input type='text' onChange={(e) => {
                    setNewFolderName(e.target.value);
                }} className='bg-[#131314] text-[#e3e3e3] p-2 overflow-hidden' placeholder='Folder Name' />


            </div>
            {(!isFolderCreating) ?
                <button onClick={async () => {
                    setIsFolderCreating(!isFolderCreating);
                    const res = await createFolder(newFolderName, contractInstance, path, account, folderData);
                    if (res) {
                        setIsCreateFolderTapped(false);
                        setIsFolderCreating(!isFolderCreating);
                        const data = await getFolderData(contractInstance, path, account);
                        setFolderData(data);
                    }

                }} className={`hover:bg-[#13415e] flex flex-row  justify-self-center w-fit  p-4 shadow-black items-center shadow-md justify-items-center bg-[#105682] rounded-xl  mt-4  `} >

                    <IoMdAdd className="w-6 h-6" />

                </button> :
                <button className={`flex flex-row  justify-self-center w-fit  p-4 shadow-black items-center shadow-md justify-items-center bg-[#105682] rounded-xl  mt-4  `} >

                    <span className="w-6 h-6 loader" />

                </button>
            }
        </div>
    )
}

export default NewFolderNameInputFloting