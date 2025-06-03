/* eslint-disable react/prop-types */
import Image from 'next/image';

const FeatureCard = ({ featureIcon, featureTitle }) => {
    return (
      <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-6 h-full flex flex-col items-center hover:bg-[#ffc702]">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#f3f4f8] rounded-full flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 group-hover:bg-white">
          <Image 
            src={featureIcon}
            alt={featureTitle}
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
        </div>
        <h5 className="font-Inter font-semibold text-base sm:text-lg text-HeadingColor-0 transition-all duration-300 text-center">
          {featureTitle}
        </h5>
      </div>
    );
  };
  
  export default FeatureCard;
  