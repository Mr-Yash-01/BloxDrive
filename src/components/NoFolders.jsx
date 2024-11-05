import React from 'react'
import { GoInbox } from 'react-icons/go'

const NoFolders = () => {
  return (
    <div className='flex flex-col text-left gap-4 mt-8'>

                                        <h1 className='px-4 text-xl font-medium'>Folders</h1>
                                        <div className='flex flex-col items-center text-center bg-[#282a2c] p-4 shadow-md shadow-[#105682] rounded-2xl w-fit'>
                                            <GoInbox className='w-14 h-14 mx-auto opacity-60' />
                                            <h1 className='text-xl opacity-60 '>No Folders</h1>
                                        </div>
                                    </div>
  )
}

export default NoFolders