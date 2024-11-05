import React from 'react'
import { useRecoilState } from 'recoil';
import { deleteTapedAtom, deletingStatusAtom, selectedFileManuplationAtom, showCreateAtom } from '../store/atoms/commonLegends';
import { CgDetailsMore } from 'react-icons/cg';
import { IoMdClose } from 'react-icons/io';
import { formatFileSize } from '../backend/formatFileSize';
import { FaEye } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const FileDetailsFloting = ({handleButtonClick}) => {

    const [selectedFileManuplation, setSelectedFileManuplation] = useRecoilState(selectedFileManuplationAtom);
    const [showCreate, setShowCreate] = useRecoilState(showCreateAtom);
    const [deletingStatus, setDeletingStatus] = useRecoilState(deletingStatusAtom);
    const [deleteTaped, setDeleteTaped] = useRecoilState(deleteTapedAtom);

    return (
        <div className='absolute top-[17%] left-1/3 lg:hidden '>
            <div className=' mx-3 lg:block mt-4 rounded-xl shadow-[#105682] overflow-hidden shadow-sm bg-[#131314]'>
                <div className='flex px-2  bg-[#105682] items-center'>
                    <CgDetailsMore className='w-6 h-6' />
                    <h1 className='bg-[#105682] p-2 text-xl font'>
                        Details
                    </h1>
                    <button onClick={() => setSelectedFileManuplation({})} className='items-center ml-auto '>
                        <IoMdClose className='w-6 h-6 ' />
                    </button>
                </div>
                <div className='p-4'>
                    <h1 className='text-xl font-semibold'>{selectedFileManuplation.name}</h1>
                    {(selectedFileManuplation.fileType !== 'folder') ?
                        <h1 className='font-medium text-lg'>Size : {formatFileSize(selectedFileManuplation.size)}</h1> : null}
                    <h1 className='font-medium text-lg'>{new Date(parseInt(selectedFileManuplation.createdAt) * 1000).toLocaleString()}</h1>
                    <h1 className='font-medium text-lg'>{selectedFileManuplation.fileType}</h1>
                </div>


            </div>

            <div className='flex px-4 gap-4 justify-around mt-4'>
                <button
                    className={`hover:bg-[#13415e] flex flex-row gap-2 px-4 py-4 justify-center shadow-black items-center shadow-md bg-[#105682] rounded-xl w-full `}
                    onClick={() => {
                        setShowCreate(!showCreate);
                        handleButtonClick(); // Trigger the file input click
                    }}
                >
                    <FaEye className="w-7 h-7" />
                </button>

                {(!deletingStatus) ?
                    <button
                        className={`hover:bg-[#13415e] flex flex-row gap-2 px-4 py-4 justify-center shadow-black items-center shadow-md bg-[#105682] rounded-xl w-full`}
                        onClick={async () => {
                            setDeleteTaped(true);
                        }}
                    >
                        <MdDeleteOutline className="w-8 h-8" />
                    </button> :
                    <div className='flex flex-row gap-2 px-4 py-4 justify-center shadow-black items-center shadow-md bg-[#105682] rounded-xl w-full'>
                        <span className='loader'></span>
                    </div>
                }
            </div>

            <div>

            </div>
        </div>
    )
}

export default FileDetailsFloting