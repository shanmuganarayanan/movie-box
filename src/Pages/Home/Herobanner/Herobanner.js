import React, { useState, useEffect } from 'react';
import Icon from '../../../Components/Icons/Icons';

const Herobanner = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isManual) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data?.length);
      } 
      else {
        setIsManual(false);
      }
    }, 2500);

    return () => {
      clearInterval(intervalId);
    };
  }, [data?.length, isManual]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsManual(true);
  };

  const titlePart = (title) => {
    const titleParts = title.split(': ');
    return (
      titleParts.length > 1 ? (
        <>
          {titleParts[0]}:<br />
          {titleParts[1]}
        </>
      ) : (
        title
      )
    );
  };

  return (
    <div className="h-full relative overflow-hidden">
        {data?.map((e, i) => (
            <div
            key={i}
            className={`w-full h-full app-padding absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 10%, rgba(12, 12, 12, 1) 90%), url(https://image.tmdb.org/t/p/original/${e.backdrop_path})`,
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            >
            <div className="grid grid-cols-1 md:grid-cols-2 place-items-center h-full">
                <div className="flex flex-col justify-center gap-4 px-4 md:px-0">
                <h1 className="text-white text-3xl md:text-5xl font-bold banner-title">{titlePart(e.title)}</h1>
                <p className="text-xs md:text-sm w-full md:w-3/4 font-medium text-white">{e?.overview}</p>
                <div className='mt-4'>
                    <button className='px-4 py-2 bg-rose-700 flex items-center text-xs md:text-sm leading-6 text-white font-bold gap-2 rounded-md'>
                      <Icon name={"Play"}/>
                      SEE MORE
                    </button>
                </div>
                </div>
            </div>
            </div>
        ))}
        <div className="absolute z-10 right-1/2 bottom-4 transform -translate-y-1/2 flex gap-1">
            {data?.map((_, index) => (
              <button
                key={index}
                className={`${index === currentIndex ? 'bg-rose-700' : 'bg-white bg-opacity-60'} h-2.5 w-2.5 rounded-full`}
                onClick={() => goToSlide(index)}
              >
                {/* {index === currentIndex && <span className='absolute top-[-16px] h-3 w-1 bg-white rounded-md'/>}
                {`${index + 1}`} */}
            </button>
            ))}
        </div>
        {/* <div className="absolute z-10 right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
            {data?.map((_, index) => (
            <button
            key={index}
            className={`${index === currentIndex ? 'text-white font-bold' : 'text-gray-400 text-xs'} leading-[14px] flex items-center justify-center gap-1.5 relative`}
            onClick={() => goToSlide(index)}
        >
            {index === currentIndex && <span className='absolute h-1 w-5 bg-white rounded-md right-4'/>}{`${index + 1}`}
        </button>
            ))}
        </div> */}
    </div>

  );
};

export default Herobanner;
