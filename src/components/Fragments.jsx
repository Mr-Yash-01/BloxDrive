import React from 'react';
import { useRecoilState } from 'recoil';
import { FaPeopleCarry as FaPeopleCarryBox } from 'react-icons/fa';
import { MdHomeFilled } from 'react-icons/md';
import { IoIosPeople } from 'react-icons/io';
import { currentFragmentAtom } from '../store/atoms/commonLegends';

const Fragments = () => {
    const [currentFragment, setCurrentFragment] = useRecoilState(currentFragmentAtom);

    return (
        <>
            {/* Me */}
            <div
                className={`flex flex-col cursor-pointer items-center lg:rounded-2xl py-2 px-4 rounded-2xl lg:flex-row lg:gap-4 ${
                    currentFragment === 0 ? 'bg-[#105682]' : ''
                }`}
                onClick={() => setCurrentFragment(0)}
            >
                <FaPeopleCarryBox className="w-8 h-8 lg:w-10 lg:h-10" />
                <h1 className="hidden lg:block">Me</h1>
            </div>

            {/* Home */}
            <div
                className={`flex flex-col cursor-pointer items-center lg:rounded-2xl py-2 px-4 rounded-2xl lg:flex-row lg:gap-4 ${
                    currentFragment === 1 ? 'bg-[#105682]' : ''
                }`}
                onClick={() => setCurrentFragment(1)}
            >
                <MdHomeFilled className="w-8 h-8 lg:w-10 lg:h-10" />
                <h1 className="hidden lg:block">My Space</h1>
            </div>

            {/* People */}
            <div
                className={`flex flex-col cursor-pointer items-center lg:rounded-2xl py-2 px-4 rounded-2xl lg:flex-row lg:gap-4 ${
                    currentFragment === 2 ? 'bg-[#105682]' : ''
                }`}
                onClick={() => setCurrentFragment(2)}
            >
                <IoIosPeople className="w-8 h-8 lg:w-10 lg:h-10" />
                <h1 className="hidden lg:block">People</h1>
            </div>
        </>
    );
};

export default Fragments;