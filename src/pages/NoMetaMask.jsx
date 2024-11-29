import React from 'react';

const NoMetaMask = () => {
    return (
        <div className="bg-[#1b1b20] flex h-screen w-screen items-center justify-center text-center">
            <div className="text-white flex flex-col items-center opacity-60">
                <h1 className="text-4xl font-bold">Can't Detect MetaMask!</h1>
                <a 
                    href="https://metamask.io/download.html" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-4 text-blue-500 underline"
                >
                    Install MetaMask
                </a>
            </div>
        </div>
    );
}

export default NoMetaMask;
