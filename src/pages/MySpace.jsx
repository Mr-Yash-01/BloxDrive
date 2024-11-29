import React from 'react';
import { FaAngleRight, FaArrowLeft, FaList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import FileCompo from '../components/FileCompo';
import FolderCompo from '../components/FolderCompo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { folderDataAtom, isCreateFolderTappedAtom, isDroppingAtom, pathAtom, selectedFilesAtom, viewAtom } from '../store/atoms/commonLegends';
import NoFiles from '../components/NoFiles';
import NoFolders from '../components/NoFolders';

const MySpace = () => {
    const [view, setView] = useRecoilState(viewAtom);
    const [path, setPath] = useRecoilState(pathAtom);
    const [folderData, setFolderData] = useRecoilState(folderDataAtom);
    const selectedFiles = useRecoilValue(selectedFilesAtom);
    const isCreateFolderTapped = useRecoilValue(isCreateFolderTappedAtom);
    const isDropping = useRecoilValue(isDroppingAtom);

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setIsDropping(true);
            }}
            className={`bg-[#131314]  lg:blur-0 py-4 px-2 ml-4 h-[830px] md:h-[860px] lg:h-[910px] xl:h-[820px] lg:ml-60 overflow-hidden rounded-3xl ${(selectedFiles) ? 'sm:blur-sm' : ''} ${(isCreateFolderTapped) ? 'sm:blur-sm' : ''}`}
        >
            {/* Fixed Header Section */}
            <nav className="flex justify-between items-center sticky py-6 px-6 bg-[#131314]">
                {/* Navigation: Left Section */}
                <div className="flex items-center gap-6">
                    {/* Back Button */}
                    <FaArrowLeft
                        className={`h-6 w-6 transition-all duration-200 ${(path.length > 1) ? 'block' : 'hidden'}`}
                        onClick={() => {
                            if (path.length > 1) {
                                setFolderData({});
                                setPath(path.slice(0, -1));
                            }
                        }}
                    />
                    {/* File Path */}
                    <div className="flex items-center overflow-x-auto max-w-full">
                        {path.map((p, index) => (
                            <h1 key={index} className="ml-2 text-2xl min-w-fit flex items-center gap-2 text-white">
                                {p}
                                {index < path.length - 1 && <FaAngleRight className="text-gray-400" />}
                            </h1>
                        ))}
                    </div>
                </div>

                {/* Navigation: Right Section (View Toggle) */}
                <div className="flex border border-gray-600 rounded-full overflow-hidden">
                    <div
                        className={`px-4 py-2 cursor-pointer transition-all duration-200 ${view === 'list' ? 'bg-[#105682] text-white' : 'bg-transparent text-gray-400'}`}
                        onClick={() => setView('list')}
                    >
                        <FaList className="h-5 w-5" />
                    </div>
                    <div
                        className={`px-4 py-2 cursor-pointer transition-all duration-200 ${view === 'grid' ? 'bg-[#105682] text-white' : 'bg-transparent text-gray-400'}`}
                        onClick={() => setView('grid')}
                    >
                        <IoGrid className="h-5 w-5" />
                    </div>
                </div>
            </nav>

            {/* Scrollable Content Section */}
            <div className='px-2 lg:px-8 pb-6 overflow-y-auto max-h-[calc(100vh-120px)]'>
                {
                    (folderData.name) ? (
                        <>
                            {
                                folderData.files && folderData.files.length > 0 ? (
                                    <FileCompo data={folderData.files} />
                                ) : (
                                    <NoFiles />
                                )
                            }
                            {
                                folderData.folders && folderData.folders.length > 0 ? (
                                    <FolderCompo data={folderData.folders} />
                                ) : (
                                    <NoFolders />
                                )
                            }
                            <div className='h-60' />
                        </>
                    ) : (
                        <div className='flex justify-center items-center'>
                            <span className='loader'></span>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MySpace;
