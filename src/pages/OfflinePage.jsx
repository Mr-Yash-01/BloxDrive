import React from 'react';
import { HiStatusOffline } from "react-icons/hi";

const OfflinePage = () => {
    return (
        <div className="bg-[#1b1b20] flex h-screen w-screen items-center justify-center text-center">
            <div className="text-white flex flex-col items-center opacity-60">
                <HiStatusOffline size={100} className="sm:w-24 sm:h-24" />
                <h1 className="text-6xl sm:text-8xl font-bold animate-pulse">Offline</h1>
                <button className="mt-4 p-2 bg-[#105682] rounded-xl text-white">
                    Retry Connection
                </button>
            </div>
        </div>
    );
}

export default OfflinePage;
