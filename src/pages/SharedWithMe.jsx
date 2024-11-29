import React, { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { IoGrid } from 'react-icons/io5';
import NoFiles from '../components/NoFiles';
import FileCompo from '../components/FileCompo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sharedDataAtom, viewAtom } from '../store/atoms/commonLegends';

const SharedWithMe = () => {

  const [view, setView] = useRecoilState(viewAtom);
  const sharedData = useRecoilValue(sharedDataAtom);

  return (
    <div className='bg-[#131314] lg:blur-0 py-4 px-2 ml-4 h-[830px] md:h-[860px] lg:h-[910px] xl:h-[820px] lg:ml-60 overflow-hidden rounded-3xl '>
      <nav className='flex justify-between items-center py-6 px-8 bg-[#131314] sticky '>
        <div className='flex items-center gap-8'>
          <h1 className='text-3xl'>Shared with Me</h1>
        </div>
        <div className='flex border overflow-hidden rounded-full'>
          <div className={`px-4 py-2 ${(view === 'list') ? 'bg-[#105682]' : ''}`} onClick={() => setView('list')}>
            <FaList className='h-4 w-4' />
          </div>
          <div className={`px-4 py-2 ${(view === 'grid') ? 'bg-[#105682]' : ''}`} onClick={() => setView('grid')}>
            <IoGrid className='h-4 w-4' />
          </div>
        </div>
      </nav>

      {
        sharedData.sharedWithMe ? (
          <div className='px-2 lg:px-8 pb-6 overflow-y-auto max-h-[calc(100vh-120px)]'>
            {
              sharedData.sharedWithMe.length ? (
                <FileCompo data={sharedData.sharedWithMe} />
              ) : (
                <NoFiles />
              )
            }
          </div>
        ) : (
          <div className='flex flex-col items-center'>
            <span className='loader'></span>
          </div>
        )
      }

    </div>
  );
}

export default SharedWithMe;
