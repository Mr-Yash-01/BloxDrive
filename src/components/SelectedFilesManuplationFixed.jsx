import React, { useRef } from 'react'
import { CgDetailsMore } from 'react-icons/cg';
import { IoMdClose, IoMdPersonAdd } from 'react-icons/io';
import { formatFileSize } from '../backend/formatFileSize';
import { giveFileAccess } from '../backend/giveFileAccess';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contractAtom, currentAccountAtom, deleteTapedAtom, deletingStatusAtom, giveAccessTapedAtom, givingAccessAtom, selectedFileManuplationAtom, toAddressAtom } from '../store/atoms/commonLegends';
import { FaEye } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const SelectedFilesManuplationFixed = () => {

    const [selectedFileManuplation, setSelectedFileManuplation] = useRecoilState(selectedFileManuplationAtom);
    const [giveAccessTaped, setGiveAccessTaped] = useRecoilState(giveAccessTapedAtom);
    const [givingAccess, setGivingAccess] = useRecoilState(givingAccessAtom);
    const [deleteTaped, setDeleteTaped] = useRecoilState(deleteTapedAtom);
    const [toAddress, setToAddress] = useRecoilState(toAddressAtom);
    const [deletingStatus, setDeletingStatus] = useRecoilState(deletingStatusAtom);
    const giveAccessAdress = useRef(null);
    const account = useRecoilValue(currentAccountAtom);
    const contractInstance = useRecoilValue(contractAtom);

    return (
        <div className='hidden lg:flex lg:flex-col gap-4'>
            <div className=' mx-3 lg:block mt-4 rounded-xl shadow-[#105682] overflow-hidden shadow-sm bg-[#131314]'>
                <div className='flex px-2 bg-[#105682] items-center'>
                    <CgDetailsMore className='w-6 h-6' />
                    <h1 className='bg-[#105682] p-2 text-xl font'>
                        Details
                    </h1>
                    <button onClick={() => {
                        setSelectedFileManuplation({});
                        setGiveAccessTaped(false);
                    }} className='items-center ml-auto'>
                        <IoMdClose className='w-6 h-6' />
                    </button>
                </div>
                <div
                    className='p-4 overflow-auto max-h-40 max-w-full'
                    style={{ overflowX: 'auto', overflowY: 'auto', wordWrap: 'break-word' }}
                >
                    <h1 className='text-xl font-semibold'>{selectedFileManuplation.name}</h1>
                    {(selectedFileManuplation.fileType !== 'folder') ? (
                        <h1 className='font-medium text-lg'>
                            Size: {formatFileSize(selectedFileManuplation.size)}
                        </h1>
                    ) : null}
                    <h1 className='font-medium text-lg'>
                        {new Date(parseInt(selectedFileManuplation.createdAt) * 1000).toLocaleString()}
                    </h1>
                    <h1 className='font-medium text-lg'>{selectedFileManuplation.fileType}</h1>
                </div>



            </div>
            <div className='flex max-h-12  px-4 gap-4 justify-around'>
                <button
                    className={`hover:bg-[#13415e] ${(selectedFileManuplation.fileType === 'folder') ? 'hidden' : 'flex flex-row'} gap-2 px-4 py-4 justify-center shadow-black items-center shadow-md bg-[#105682] rounded-xl w-full `}
                    onClick={() => {
                        setGiveAccessTaped(!giveAccessTaped);
                        giveAccessAdress.current.value = '';
                    }}
                >
                    {
                        (!giveAccessTaped) ? <FaEye className="w-7 h-7" /> : <IoMdClose className="w-9 h-9" />
                    }
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
            <div className={`${giveAccessTaped ? 'flex flex-col max-h-24 max-w-full items-center gap-2 mx-4 my-2' : 'hidden'}`}>
                <input
                    type='text'
                    ref={giveAccessAdress}
                    onChange={(e) => {
                        setToAddress(e.target.value);
                    }}
                    className='bg-[#131314] flex-grow outline  outline-[#105682] rounded-md h-12 text-[#e3e3e3] px-4'
                    placeholder='Enter address'
                />
                {(!givingAccess) ? (
                    <IoMdPersonAdd
                        className="w-14 h-12 p-2 flex flex-row justify-end shadow-black items-center shadow-md bg-[#105682] rounded-xl cursor-pointer"
                        onClick={async () => {
                            setGivingAccess(true);
                            const res = await giveFileAccess(account, toAddress, selectedFileManuplation, contractInstance);
                            if (res) {
                                setGivingAccess(false);
                                setGiveAccessTaped(false);
                            }
                        }}
                    />
                ) : (
                    <div className='flex flex-row gap-2 w-14 h-14 p-2 justify-center shadow-black items-center shadow-md bg-[#105682] rounded-xl'>
                        <span className='loader'></span>
                    </div>
                )}
            </div>


            <div>

            </div>
        </div>
    )
}

export default SelectedFilesManuplationFixed