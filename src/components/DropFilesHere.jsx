import React from 'react';
import { useRecoilState } from 'recoil';
import { TiUpload } from "react-icons/ti";
import { isDroppingAtom, selectedFilesAtom } from '../store/atoms/commonLegends';

const DropFilesHere = () => {
    const [isDropping, setIsDropping] = useRecoilState(isDroppingAtom);
    const [selectedFiles, setSelectedFiles] = useRecoilState(selectedFilesAtom);

    // Handle file drop
    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        
        // Optionally validate files (e.g., check types, sizes)
        const validFiles = files.filter(file => file.type.startsWith('image/'));  // Example validation
        setIsDropping(false);
        setSelectedFiles(validFiles);
    };

    // Handle when drag leaves the container
    const handleDragLeave = () => {
        setIsDropping(false);
    };

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setIsDropping(true);
            }}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave} 
            className='bg-[#131314] lg:blur-0 py-4 px-2 ml-4 h-[830px] md:h-[760px] lg:h-[910px] xl:h-[820px] lg:ml-60 overflow-hidden rounded-3xl'
        >
            <div className='h-[760px] md:h-[660px] lg:h-[860px] xl:h-[750px] m-8 flex items-center justify-center outline-[#2f2f38] rounded-lg outline-dotted'>
                <div className='flex flex-col text-center items-center text-[#2f2f38]'>
                    <TiUpload className='w-44 h-44' />
                    <h1 className='text-4xl font-bold'>DROP FILES HERE</h1>
                    <h1 className='text-4xl font-bold'>TO UPLOAD</h1>
                </div>
            </div>
        </div>
    );
};

export default DropFilesHere;
