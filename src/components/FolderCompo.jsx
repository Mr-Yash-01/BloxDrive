import React from 'react';
import { FaFolder } from "react-icons/fa6";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { contractAtom, currentAccountAtom, folderDataAtom, isOptionsTapedAtom, pathAtom, selectedFileManuplationAtom, toBeSearchAtom, viewAtom } from '../store/atoms/commonLegends';
import { SlOptionsVertical } from 'react-icons/sl';

const FolderCompo = ({ data = [] }) => {

  const [path, setPath] = useRecoilState(pathAtom);
  const account = useRecoilValue(currentAccountAtom);
  const contractInstance = useRecoilValue(contractAtom);
  const [folderData, setFolderData] = useRecoilState(folderDataAtom);
  const setSelectedFileManuplation = useSetRecoilState(selectedFileManuplationAtom);
  const setIsOptionsTaped = useSetRecoilState(isOptionsTapedAtom);
  const toBesearch = useRecoilValue(toBeSearchAtom);
  const [view, setView] = useRecoilState(viewAtom);

  // Filter folders based on the search query
  const filteredData = data.filter(folder =>
    folder.name.toLowerCase().includes(toBesearch.toLowerCase())
  );

  if (view === 'list') {
    return (
      <div className='p-2 mt-6'>
        <h1 className='px-4 text-xl font-medium'>Folders</h1>
        {filteredData.map((file, index) => (
          <div key={index} className='grid grid-cols-1 items-center justify-between p-4  border-b border-[#3c3c3c]'>
            <div className='flex flex-row justify-between items-center gap-4 w-full'>
              <div className='flex items-center gap-4 cursor-pointer ' onClick={() => {
                setFolderData([]);
                setPath([...path, file.name]);
              }}>
                <FaFolder className='w-8 h-8' />
                <h1 className='text-lg truncate max-w-[170px] md:max-w-[300px]' title={file.name}>{file.name}</h1>
              </div>
              <div className='flex gap-12 xl:gap-24 cursor-pointer items-center'>
                <h1 className='hidden md:block' title={new Date(parseInt(file.createdAt) * 1000).toLocaleString()}>{new Date(parseInt(file.createdAt) * 1000).toLocaleString()}</h1>
                <SlOptionsVertical className={`w-4 h-4 `} onClick={() => {
                  setSelectedFileManuplation({ ...file, fileType: 'folder' });
                  setIsOptionsTaped(true);
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className='mt-8'>
        <h1 className='px-4 text-xl font-medium'>Folders</h1>
        <div className='grid grid-cols-2  gap-8 p-8 xl:grid-cols-4'>
          {filteredData.map((file, index) => (
            <div key={file.id || index} className="flex flex-col p-2 gap-2 rounded-xl">
              <div className="flex flex-row gap-4">
                <div
                  className="flex flex-col items-center flex-grow cursor-pointer"
                  onClick={() => {
                    setPath((prevPath) => [...prevPath, file.name]);
                    setFolderData([]);
                  }}
                >
                  <FaFolder className="w-24 h-24 lg:w-36 lg:h-36" />
                  <h1 className="text-2xl text-center overflow-clip truncate max-w-[200px] lg:max-w-[230px]">{file.name}</h1>
                </div>
                <div className="w-fit cursor-pointer">
                  <SlOptionsVertical
                    className="w-5 h-5 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFileManuplation({ ...file, fileType: 'folder' });
                      setIsOptionsTaped(true);
                    }}
                  />
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    );
  }
}

export default FolderCompo;
