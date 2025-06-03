/* eslint-disable no-unused-vars */
import Image from 'next/image';
import officeCleaningIcon from "@/public/images/office-building.png";
import deepCleaningIcon from "@/public/images/deep.png";
import houseCleaningIcon from "@/public/images/home.png";
import eventCleaningIcon from "@/public/images/calendar.png";
import retailCleaningIcon from "@/public/images/hand-shake.png";
import FeatureCard from "./cards/FeatureCard";

const processData = [
  {
    id: 1,
    featureIcon: officeCleaningIcon,
    featureTitle: "Office Cleaning",
  },
  {
    id: 2,
    featureIcon: deepCleaningIcon,
    featureTitle: "Deep Cleaning",
  },
  {
    id: 3,
    featureIcon: houseCleaningIcon,
    featureTitle: "Regular House Cleaning",
  },
  {
    id: 4,
    featureIcon: eventCleaningIcon,
    featureTitle: "Event Cleaning",
  },
  {
    id: 5,
    featureIcon: retailCleaningIcon,
    featureTitle: "Retail Space Cleaning",
  },
];

const Feature = () => {
  return (
    <section className="py-20 bg-[#f3f4f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {processData.map(({ id, featureIcon, featureTitle }) => (
            <div key={id} className="w-full">
              <FeatureCard
                featureIcon={featureIcon}
                featureTitle={featureTitle}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
