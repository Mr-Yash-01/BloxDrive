import React from 'react'

const LoadingPage = () => {
    return (
        <div className="bg-[#1b1b20] flex h-screen w-screen items-center justify-center text-center">
            <div className="text-white flex flex-col items-center opacity-60">
                <h1 className="text-8xl font-bold">Loading...</h1>
            </div>
        </div>
    );
}

export default LoadingPage