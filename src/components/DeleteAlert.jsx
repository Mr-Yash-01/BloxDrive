import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { contractAtom, currentAccountAtom, currentFragmentAtom, deleteTapedAtom, deletingStatusAtom, pathAtom, selectedFileManuplationAtom, sharedDataAtom, pinataAtom } from '../store/atoms/commonLegends';
import { IoMdClose } from 'react-icons/io';
import { deleteFile } from '../backend/deleteFile';
import { deleteFolder } from '../backend/deleteFolder';
import { deleteSharedWithMe } from '../backend/deleteSharedWithMe';
import { deleteSharedToPeople } from '../backend/deleteSharedToPeople';

const DeleteAlert = () => {
    const [deleteTaped, setDeleteTaped] = useRecoilState(deleteTapedAtom);
    const [deletingStatus, setDeletingStatus] = useRecoilState(deletingStatusAtom);
    const [path, setPath] = useRecoilState(pathAtom);
    const [selectedFileManuplation, setSelectedFileManuplation] = useRecoilState(selectedFileManuplationAtom);
    const [account] = useRecoilState(currentAccountAtom);
    const contractInstance = useRecoilValue(contractAtom);
    const [currentFragment, setCurrentFragment] = useRecoilState(currentFragmentAtom);
    const setSharedData = useSetRecoilState(sharedDataAtom);

    const handleDelete = async () => {
        setDeleteTaped(false);
        setDeletingStatus(true);

        try {
            let res;
            // Case for currentFragment === 1 (files or folders)
            if (currentFragment === 1) {
                if (selectedFileManuplation.fileType !== 'folder') {
                    res = await deleteFile(account, path, selectedFileManuplation.name, selectedFileManuplation.cid, pinataAtom, contractInstance);
                } else {
                    res = await deleteFolder(contractInstance, path, selectedFileManuplation.name, account);
                }
                if (res) {
                    setPath(prevPath => [...prevPath]); // Updates path without causing unnecessary re-renders
                    setSelectedFileManuplation({});
                }
            }
            // Case for currentFragment === 2 (shared to people)
            else if (currentFragment === 2) {
                res = await deleteSharedToPeople(contractInstance, selectedFileManuplation.cid, account);
                if (res) {
                    setSelectedFileManuplation({});
                    setCurrentFragment(2);
                    setSharedData([]);
                }
            }
            // Case for currentFragment === 0 (shared with me)
            else {
                res = await deleteSharedWithMe(contractInstance, selectedFileManuplation.cid, account);
                if (res) {
                    setSelectedFileManuplation({});
                    setCurrentFragment(0);
                    setSharedData([]);
                }
            }
        } catch (error) {
            console.error('Error in deleting file/folder/shared data:', error);
        } finally {
            setDeletingStatus(false); // Ensure status is reset after operation
        }
    };

    return (
        <div className='absolute z-50 top-1/3 left-1/3 bg-[#131314] w-96 rounded-xl overflow-hidden shadow shadow-[#105682]'>
            <div className='flex bg-[#105682] items-center px-2'>
                <h1 className='text-2xl font-semibold p-2'>Alert</h1>
                <IoMdClose onClick={() => setDeleteTaped(false)} className='w-8 h-8 ml-auto cursor-pointer' />
            </div>
            <h1 className='text-2xl p-2'>Are you sure you want to delete this {(selectedFileManuplation.fileType === 'folder') ? 'Folder' : 'File'}?</h1>
            <div className='flex gap-4 p-2 text-xl font-medium'>
                <button onClick={handleDelete} className='bg-[#105682] hover:bg-[#13415e] p-2 rounded-xl'>
                    Ok
                </button>
                <button onClick={() => setDeleteTaped(false)} className='bg-[#105682] hover:bg-[#13415e] p-2 rounded-xl'>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;
