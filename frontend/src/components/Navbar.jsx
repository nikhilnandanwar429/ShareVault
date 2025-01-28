import React, { useContext, useEffect, useState } from 'react'
import TextAnimation from './TextAnimation';
import DocumentIcon from '../assets/icons8-document.svg';
import { useFileType } from '../context/fileType';


function Navbar() {
    const { fileType, changeFileType } = useFileType();
    const clickHandler = (e) => {
        const value = e.target.innerText || e.target.alt;
        console.log(value);
        changeFileType(value);
    }


    return (
        <>
            <div
                className='w-full flex flex-col items-center '
            >
                <div
                    className='w-full bg-[#237de4] p-4 flex items-center justify-center'
                >
                    <TextAnimation
                        sentence="Share Anything, Anytime, Anywhere"
                    />
                </div>
                <div
                    className='w-4/12 mt-4 p-2 flex justify-around bg-pink-600 rounded-xl'
                >
                    <button
                        className={`w-1/3 text-center p-2 px-6 rounded-lg font-bold flex items-center justify-center cursor-pointer ${fileType === 'Text' ? "bg-blue-600" : "bg-green-400"}`}
                        onClick={clickHandler}
                    >
                        <img
                            width="50"
                            height="50"
                            src="https://img.icons8.com/ios-filled/50/align-left.png"
                            alt="Text"
                            className='w-4 mx-1'
                        />
                        Text
                    </button>
                    <button
                        className={`w-1/3 text-center p-2 px-6 rounded-lg font-bold flex items-center justify-center cursor-pointer ${fileType === 'Files' ? "bg-blue-600" : "bg-green-400"}`}
                        onClick={clickHandler}
                    >
                        <img
                            alt='Files'
                            src={DocumentIcon}
                            className='w-5 mx-1'
                        />
                        Files
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar;