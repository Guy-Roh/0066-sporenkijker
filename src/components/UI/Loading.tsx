import Image from 'next/image';
import textData from '@/data/textData.json';

const Loading = () => {
    return (
        <div className="relative w-[100%] h-[40px] rounded-sm overflow-hidden opacity-90 ">

            <Image
                src="/img/loader6.webp"
                alt="Loading train data"
                fill
                className="object-cover scale-125"
                unoptimized
            />
            
            {/* Added mix-blend-difference and updated z-index */}
            <div className="overlay-text text-[3.8vmin] lg:text-base relative z-10 text-white font-medium text-center p-2 font-semibold lg:font-normal mix-blend-difference">
                {textData.loading_message}
            </div>
        </div>
    )
}

export default Loading