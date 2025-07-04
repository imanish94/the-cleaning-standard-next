/* eslint-disable react/prop-types */
import Image from "next/image";

const TeamCard = ({teamThumb, teamTitle, teamDesc}) => {
  return (
    <div className="group">
      <div className="relative z-10 overflow-hidden before:absolute before:bottom-0 before:left-0 before:w-full before:h-5/6 before:bg-gradient-to-t before:from-blue-500 before:to-transparent before:transition-all before:duration-500 before:opacity-75 group-hover:before:h-0 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0 after:transition-all after:duration-500 after:bg-gradient-to-t after:from-PrimaryColor-0 after:to-transparent after:opacity-75 group-hover:after:h-5/6">
        <Image 
          src={teamThumb} 
          alt={teamTitle}
          width={300}
          height={400}
          className="w-full h-auto"
        />
      </div>
      <div className="bg-white text-center pt-[22px] pb-[26px] relative before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-1 before:bg-SecondaryColor-0 before:transition-all before:duration-500 group-hover:before:w-full group-hover:before:left-0">
        <h5 className="font-Inter font-bold text-[22px] text-HeadingColor-0">
          {teamTitle}
        </h5>
        <p className="font-Inter text-TextColor-0">{teamDesc}</p>
      </div>
    </div>
  );
};

export default TeamCard;
