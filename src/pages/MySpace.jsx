import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaArrowLeft, FaList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import FileCompo from '../components/FileCompo';
import FolderCompo from '../components/FolderCompo';
import { GoInbox } from "react-icons/go";
import { useRecoilState, useRecoilValue } from 'recoil';
import { deleteTapedAtom, folderDataAtom, isCreateFolderTappedAtom, isDroppingAtom, isFolderCreatingAtom, pathAtom, selectedFileManuplationAtom, selectedFilesAtom, viewAtom } from '../store/atoms/commonLegends';
import NoFiles from '../components/NoFiles';
import NoFolders from '../components/NoFolders';

const MySpace = () => {

    const [view, setView] = useRecoilState(viewAtom);
    const [path, setPath] = useRecoilState(pathAtom);
    const [folderData, setFolderData] = useRecoilState(folderDataAtom);
    const [selectedFiles, setSelectedFiles] = useRecoilState(selectedFilesAtom);
    const selectedFileManuplation = useRecoilValue(selectedFileManuplationAtom);
    const deleteTaped = useRecoilValue(deleteTapedAtom);
    const [isDropping, setIsDropping] = useRecoilState(isDroppingAtom);
    const [isCreateFolderTapped, setIsCreateFolderTapped] = useRecoilState(isCreateFolderTappedAtom);
    const [isFodlerCreating, setIsFolderCreating] = useRecoilState(isFolderCreatingAtom);



    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setIsDropping(true);
            }}
            className={`bg-[#1b1b20] lg:ml-60 overflow-hidden rounded-3xl
            ${(selectedFileManuplation.name) ? 'blur-sm' : ''} 
            ${(selectedFiles) ? 'sm:blur-sm' : ''} 
            ${(isCreateFolderTapped) ? 'sm:blur-sm' : ''} 
            ${(deleteTaped) ? 'lg:blur-sm' : ''}`}
            >
            {/* Wrapper Div for Padding */}
            <div className="bg-[#131314] sticky rounded-3xl lg:p-6 h-[calc(100vh-120px)] flex flex-col">
                {/* Fixed Header Section */}
                <nav className="flex justify-between items-center sticky py-6 px-6 bg-[#131314] top-0 z-10">
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
                <div className="flex-1 overflow-y-auto mt-4">
                    {
                        folderData.name ? (
                            <>
                                {folderData.files && folderData.files.length > 0 ? (
                                    <FileCompo data={folderData.files} />
                                ) : (
                                    <NoFiles />
                                )}
                                {folderData.folders && folderData.folders.length > 0 ? (
                                    <FolderCompo data={folderData.folders} />
                                ) : (
                                    <NoFolders />
                                )}
                            </>
                        ) : (
                            <div className="flex justify-center items-center">
                                <span className="loader"></span>
                            </div>
                        )
                    }
                    <div className='h-32'></div>
                </div>
            </div>
        </div>
    );


};

export default MySpace;