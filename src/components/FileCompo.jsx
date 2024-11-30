import React from 'react';
import { CiFileOn } from "react-icons/ci";
import { SlOptionsVertical } from 'react-icons/sl';
import { BiDownload } from "react-icons/bi"; // Import download icon
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

  // Filter files based on the search query
  const filteredData = data.filter(file =>
    file.name.toLowerCase().includes(toBesearch.toLowerCase())
  );

  // Function to open the file in the browser
  const openFileInBrowser = (cid) => {
    window.open(`https://ipfs.io/ipfs/${cid}`, "_blank");
  };

  // Function to trigger file download
  const downloadFile = (cid, name) => {
    const link = document.createElement("a");
    link.href = `https://ipfs.io/ipfs/${cid}`;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (view === 'list') {
    return (
      <div className="p-2 flex flex-col">
        <h1 className="px-4 text-xl font-medium">Files</h1>
        {filteredData.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b border-[#3c3c3c]"
          >
            <div className="flex items-center flex-grow gap-4 lg:w-96">
              <div
                className="flex items-center gap-4 flex-shrink-0 cursor-pointer"
                onClick={() => openFileInBrowser(file.cid)}
              >
                <CiFileOn className="w-8 h-8" />
                {/* Tooltip for full file name on hover */}
                <h1 className="text-lg truncate max-w-[170px] md:max-w-[300px] lg:max-w-[200px] xl:max-w-[300px] cursor-pointer" title={file.name}>
                  {file.name}
                </h1>
              </div>
              <div className="flex items-center justify-end flex-grow gap-12 xl:gap-24">
                {/* Display file type or placeholder */}
                <h1 className="hidden xl:block text-left w-20 truncate max-w-[150px] lg:max-w-[200px] xl:max-w-[300px] cursor-pointer " title={formatFiletype(file.fileType)}>
                  {file.fileType ? formatFiletype(file.fileType) : "Unknown"}
                </h1>
                {/* Display file size or placeholder */}
                <h1 className="hidden lg:block text-left w-24 truncate max-w-[150px] lg:max-w-[200px] xl:max-w-[300px] cursor-pointer" title={formatFileSize(file.size)}>
                  {file.size ? formatFileSize(file.size) : "-"}
                </h1>
                {/* Display file creation date or placeholder */}
                <h1 className="hidden md:block text-left w-40 truncate  lg:max-w-[200px] xl:max-w-[300px] cursor-pointer" title={new Date(parseInt(file.createdAt) * 1000).toLocaleString()}>
                  {file.createdAt ? new Date(parseInt(file.createdAt) * 1000).toLocaleString() : "-"}
                </h1>
                {/* Download button */}
                <BiDownload
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => downloadFile(file.cid, file.name)}
                  title="Download"
                />
                {/* Options button */}
                <SlOptionsVertical
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => {
                    setSelectedFileManuplation(file);
                    setIsOptionsTaped(true);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="px-4 text-xl font-medium">Files</h1>
        <div className="grid grid-cols-2 gap-8 p-8 xl:grid-cols-4">
          {filteredData.map((file, index) => (
            <div
              key={index}
              className="flex flex-col p-2 gap-2 rounded-xl bg-[#282a2c]"
            >
              <div className="flex justify-between items-center px-2 py-1">
                <div
                  onClick={() => openFileInBrowser(file.cid)}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <CiFileOn className="w-8 h-8" />
                  {/* Tooltip for full file name on hover */}
                  <h1 className="text-lg truncate max-w-[170px] lg:max-w-[200px] xl:max-w-[130px]" title={file.name}>
                    {file.name}
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  {/* Download button */}
                  <BiDownload
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => downloadFile(file.cid, file.name)}
                    title="Download"
                  />
                  {/* Options button */}
                  <SlOptionsVertical
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => {
                      setSelectedFileManuplation(file);
                      setIsOptionsTaped(true);
                    }}
                  />
                </div>
              </div>
              <div
                onClick={() => openFileInBrowser(file.cid)}
                className="flex flex-row h-52 flex-grow justify-center items-center rounded-xl bg-[#131313] cursor-pointer"
              >
                <CiFileOn className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default FileCompo;
