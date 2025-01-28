import React from 'react';

function TextUploadSection() {
    return (
        <>
            <div
                className='w-full bg-green-500 h-56 mt-12 flex flex-col items-center justify-center'
            >


                <textarea
                    name="sendText"
                    id=""
                    rows="5"
                    cols="85"
                    placeholder='Enter Your Text Here'
                    className='resize-none focus:outline-none p-2 rounded-lg focus:ring-2 focus:ring-blue-700 transition-all bg-[#a64dda] border-2 border-red-500'
                >
                </textarea>
                <div className='w-full flex items-center justify-center'>
                    <button className='bg-red-500 m-4 px-4 py-1 rounded-lg'>
                        Send
                    </button>
                    <button className='bg-red-500 m-4 px-4 py-1 rounded-lg'>
                        Reset
                    </button>
                </div>

            </div>
        </>
    )
}

export default TextUploadSection;