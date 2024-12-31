import React from 'react';
import demoPic from '../../../assets/demo.png';

function Home() {
    const Userdata = JSON.parse(localStorage.getItem("userData"));
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center text-center gap-4 p-6 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
                <img src={demoPic} alt="User Profile" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full" />
                <p className="text-xl sm:text-2xl font-bold text-gray-100">👋 Hello,{Userdata.username}!</p>
                <p className="text-sm sm:text-md text-gray-400">
                    ✨ Welcome to your dashboard – let’s make things happen! 🚀
                </p>
            </div>
        </div>
    );
}

export default Home;
