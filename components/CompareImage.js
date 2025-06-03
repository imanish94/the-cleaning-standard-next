import { useState } from 'react';
import Image from 'next/image';

const CompareImage = ({ leftImage, rightImage }) => {
  const [showBefore, setShowBefore] = useState(true);

  return (
    <div className="relative h-[400px] w-full">
      <div className="relative h-full w-full">
        <Image
          src={showBefore ? leftImage : rightImage}
          alt={showBefore ? "Before cleaning" : "After cleaning"}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-md"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 bg-white/80 px-4 py-2 rounded-full">
        <button
          onClick={() => setShowBefore(true)}
          className={`px-4 py-2 rounded-full transition-colors ${
            showBefore ? 'bg-SecondaryColor-0 text-white' : 'hover:bg-gray-100'
          }`}
        >
          Before
        </button>
        <button
          onClick={() => setShowBefore(false)}
          className={`px-4 py-2 rounded-full transition-colors ${
            !showBefore ? 'bg-SecondaryColor-0 text-white' : 'hover:bg-gray-100'
          }`}
        >
          After
        </button>
      </div>
    </div>
  );
};

export default CompareImage; 