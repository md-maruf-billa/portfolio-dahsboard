
import React from 'react';
import Image from "next/image"
const Loading = () => {
    return (

        <div className="w-full h-screen flex justify-center
          items-center relative overflow-hidden py-20 bg-gray-200 dark:bg-black">
            <div className="relative flex justify-center items-center">
                <div
                    className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
                <Image
                    width={800}
                    height={800}
                    alt="Abumahid"
                    src="/mypic.jpg"
                    className="rounded-full h-20 w-20"/>
            </div>
        </div>

    );
};

export default Loading;