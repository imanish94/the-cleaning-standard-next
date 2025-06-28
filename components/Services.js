/* eslint-disable no-unused-vars */
import { FaArrowRightLong } from "react-icons/fa6";
import ServiceCard from "./cards/ServiceCard";
import officeCleaningIcon from "@/public/images/office-building.png";
import deepCleaningIcon from "@/public/images/deep.png";
import houseCleaningIcon from "@/public/images/home.png";
import airbnbCleaningIcon from "@/public/images/airbnb.png";
import eventCleaningIcon from "@/public/images/calendar.png";
import retailCleaningIcon from "@/public/images/hand-shake.png";

const getIconForService = (serviceName) => {
  switch (serviceName) {
    case 'House Cleaning':
      return houseCleaningIcon;
    case 'Deep Cleaning':
      return deepCleaningIcon;
    case 'Airbnb Cleaning':
      return airbnbCleaningIcon;
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

const getServiceUrl = (serviceName) => {
  return `/service-details/${serviceName.toLowerCase().replace(/\s+/g, '-')}`;
};

const Services = ({services}) => {
  return (
    <section className="pt-28 pb-[90px] relative bg-[url('/images/service-bg-mop.jpg')] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/80 before:to-black/60 before:z-0">
      <div className="Container relative z-10">
        <div className="grid grid-cols-1 lg:items-center lg:grid-cols-2 gap-14 xl:gap-28 2xl:gap-36">
          <div>
            <h5 className="font-Inter text-lg text-PrimaryColor-0 font-medium pl-9 relative before:absolute before:top-1/2 before:left-0 before:w-6 before:h-3 before:bg-[url(/images/cleaning-shapes2.png)] before:bg-no-repeat before:bg-[inherit] before:-translate-y-1/2">
              THE CLEANING STANDARDS SERVICES
            </h5>
            <h1 className="font-Inter font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[44px] xl:leading-[54px] 2xl:text-[50px] 2xl:leading-[66px] text-white mt-3 mb-4">
              Your Trusted <span className="text-PrimaryColor-0">Cleaning</span>
              <br />
              Service Partner
            </h1>
            <p className="font-Poppins text-white font-light mb-14">
              Services we partners you as soon as possible your home or office
              Just <br className="hidden 2xl:block" /> Feel Free contact us
              based web develop.
            </p>
          </div>
          <div>
            {services.map((service, index) => (
              <div key={service.uuid}>
                <ServiceCard
                  serviceIcon={getIconForService(service.name)}
                  serviceTitle={service.name}
                  serviceUrl={getServiceUrl(service.name)}
                  serviceBtn="Read More"
                  serviceBtnIcon={<FaArrowRightLong />}
                  serviceNumber={`0${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
