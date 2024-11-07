import React from 'react'
import { HiStatusOffline } from "react-icons/hi";

const OfflinePage = () => {
    return (
        <div className="bg-[#1b1b20] flex h-screen w-screen items-center justify-center text-center">
            <div className="text-white flex flex-col items-center opacity-60">
                <HiStatusOffline size={100} />
                <h1 className="text-8xl font-bold">Offline</h1>
            </div>
        </div>
    );
}

export default OfflinePage