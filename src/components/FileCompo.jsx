import React, { useMemo } from 'react';
import { CiFileOn } from "react-icons/ci";
import { SlOptionsVertical } from 'react-icons/sl';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { contractAtom, currentAccountAtom, isOptionsTapedAtom, pathAtom, selectedFileManuplationAtom, toBeSearchAtom, viewAtom } from '../store/atoms/commonLegends';
import { formatFileSize } from '../backend/formatFileSize';
import { formatFiletype } from '../backend/formatFileType';

const FileCompo = ({ data = [] }) => {

  const [path, setPath] = useRecoilState(pathAtom);
  const account = useRecoilValue(currentAccountAtom);
  const contractInstance = useRecoilValue(contractAtom);
  const setSelectedFileManuplation = useSetRecoilState(selectedFileManuplationAtom);
  const setIsOptionsTaped = useSetRecoilState(isOptionsTapedAtom);
  const toBesearch = useRecoilValue(toBeSearchAtom);
  const [view, setView] = useRecoilState(viewAtom);

  // Memoize filtered data to improve performance
  const filteredData = useMemo(() => {
    return data.filter(file =>
      file.name.toLowerCase().includes(toBesearch.toLowerCase())
    );
  }, [data, toBesearch]);

  if (view === 'list') {
    return (
      <div className="p-2 flex flex-col">
        <h1 className="px-4 text-xl font-medium">Files</h1>
        {filteredData.length === 0 ? (
          <p>No files found</p>
        ) : (
          filteredData.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border-b border-[#3c3c3c]"
            >
              <div className="flex items-center flex-grow gap-4 lg:w-96">
                <div
                  className="flex items-center gap-4 flex-shrink-0 cursor-pointer"
                  onClick={async () => {
                    window.open(`ipfs://${file.cid}`, "_blank");
                  }}
                >
                  <CiFileOn className="w-8 h-8" />
                  <h1 className="text-lg truncate max-w-[170px] md:max-w-[300px] lg:max-w-[200px] xl:max-w-[300px] cursor-pointer" title={file.name}>
                    {file.name}
                  </h1>
                </div>
                <div className="flex items-center justify-end flex-grow gap-12 xl:gap-24">
                  <h1 className="hidden xl:block text-left w-20 truncate max-w-[150px] lg:max-w-[200px] xl:max-w-[300px] cursor-pointer " title={formatFiletype(file.fileType)}>
                    {file.fileType ? formatFiletype(file.fileType) : "Unknown"}
                  </h1>
                  <h1 className="hidden lg:block text-left w-24 truncate max-w-[150px] lg:max-w-[200px] xl:max-w-[300px] cursor-pointer" title={formatFileSize(file.size)}>
                    {file.size ? formatFileSize(file.size) : "-"}
                  </h1>
                  <h1 className="hidden md:block text-left w-40 truncate  lg:max-w-[200px] xl:max-w-[300px] cursor-pointer" title={new Date(parseInt(file.createdAt) * 1000).toLocaleString()}>
                    {file.createdAt ? new Date(parseInt(file.createdAt) * 1000).toLocaleString() : "-"}
                  </h1>
                  <SlOptionsVertical
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => {
                      setSelectedFileManuplation(file);
                      setIsOptionsTaped(true);
                    }}
                    aria-label="File options"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );

  } else {
    return (
      <div>
        <h1 className="px-4 text-xl font-medium">Files</h1>
        <div className="grid grid-cols-2 gap-8 p-8 xl:grid-cols-4">
          {filteredData.length === 0 ? (
            <p>No files found</p>
          ) : (
            filteredData.map((file, index) => (
              <div
                key={index}
                className="flex flex-col p-2 gap-2 rounded-xl bg-[#282a2c]"
              >
                <div className="flex justify-between items-center px-2 py-1">
                  <div
                    onClick={() => {
                      window.open(`ipfs://${file.cid}`, "_blank");
                    }}
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    <CiFileOn className="w-8 h-8" />
                    <h1 className="text-lg truncate max-w-[170px] lg:max-w-[200px] xl:max-w-[130px]" title={file.name}>
                      {file.name}
                    </h1>
                  </div>
                  <SlOptionsVertical
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => {
                      setSelectedFileManuplation(file);
                      setIsOptionsTaped(true);
                    }}
                    aria-label="File options"
                  />
                </div>
                <div
                  onClick={() => {
                    window.open(`ipfs://${file.cid}`, "_blank");
                  }}
                  className="flex flex-row h-52 flex-grow justify-center items-center rounded-xl bg-[#131313] cursor-pointer"
                >
                  <CiFileOn className="w-8 h-8" />
                  {/* Add image thumbnail if file is an image */}
                  {file.fileType && file.fileType.startsWith('image/') && (
                    <img src={`ipfs://${file.cid}`} alt={file.name} className="w-full h-full object-cover rounded-xl" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default FileCompo;
