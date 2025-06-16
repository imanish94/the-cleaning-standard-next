/* eslint-disable no-unused-vars */
import Image from 'next/image';
import officeCleaningIcon from "@/public/images/office-building.png";
import deepCleaningIcon from "@/public/images/deep.png";
import houseCleaningIcon from "@/public/images/home.png";
import eventCleaningIcon from "@/public/images/calendar.png";
import retailCleaningIcon from "@/public/images/hand-shake.png";
import FeatureCard from "./cards/FeatureCard";

const getIconForService = (serviceName) => {
  switch (serviceName) {
    case 'House Cleaning':
      return houseCleaningIcon;
    case 'Deep Cleaning':
      return deepCleaningIcon;
    case 'Airbnb Cleaning':
      return houseCleaningIcon;
    case 'Office Cleaning':
      return officeCleaningIcon;
    case 'Retail Space Cleaning':
      return retailCleaningIcon;
    case 'Event Cleaning':
      return eventCleaningIcon;
    default:
      return houseCleaningIcon;
  }
};

const Feature = ({services}) => {
  return (
    <section className="py-20 bg-[#f3f4f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service) => (
            <div key={service.uuid} className="w-full">
              <FeatureCard
                featureIcon={getIconForService(service.name)}
                featureTitle={service.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
