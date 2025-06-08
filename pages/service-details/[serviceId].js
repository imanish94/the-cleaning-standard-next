import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Breadcamp from '../../components/Breadcamp';
import CompareImage from '../../components/CompareImage';
import wedgetIcon from "@/public/images/widget-icon.png";
import projectDetailsIcon from "@/public/images/sidber-icon.png";
import projectDetailsIcon2 from "@/public/images/sidber-icon2.png";
import { FaArrowRight, FaArrowRightLong, FaRegFolderOpen } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { HiDownload } from "react-icons/hi";
import { BsFileEarmarkPdf } from "react-icons/bs";
import ServiceFaq from "../../components/ServiceFAQ";
import servicesData from '../../data/services.json';
import { useState, useEffect } from 'react';
import { useService } from '../../context/ServiceContext';

const ServiceDetails = ({ service }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { selectService } = useService();

  // Map the service ID to match the booking form service IDs
  const serviceIdMap = {
    'house-cleaning': 'regular',
    'deep-cleaning': 'deep',
    'airbnb-cleaning': 'airbnb',
    'office-cleaning': 'office',
    'retail-space-cleaning': 'retail',
    'event-cleaning': 'event'
  };

  useEffect(() => {
    if (service) {
      setIsLoading(false);
      // Set the selected service in context using the mapped service ID
      const mappedServiceId = serviceIdMap[service.id];
      selectService(mappedServiceId);
    }
  }, [service, selectService]);

  // Show loading state while the page is being generated
  if (router.isFallback || isLoading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-2xl font-semibold text-HeadingColor-0">Loading...</h1>
        </div>
      </>
    );
  }

  if (!service) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-2xl font-semibold text-HeadingColor-0">Service not found</h1>
        </div>
      </>
    );
  }

  const renderServiceCategories = () => (
    <div className="bg-[#f3f4f8] rounded-md px-4 sm:px-8 lg:px-6 xl:px-8 pt-7 pb-4 mb-7">
      <h4 className="font-Inter font-semibold text-2xl text-HeadingColor-0 pb-3 mb-8 relative before:absolute before:bottom-0 before:left-0 before:w-7 before:h-[2px] before:bg-SecondaryColor-0">
        Categories
      </h4>
      <ul className="mt-8">
        {servicesData.services.map((s) => (
          <li key={s.id}>
            <Link href={`/service-details/${s.id}`}>
              <button className={`w-full font-Inter text-left transition-all duration-500 group px-7 py-4 flex items-center justify-between rounded mb-3 overflow-hidden z-[1] relative before:absolute before:top-0 before:right-0 before:w-0 before:-z-[1] before:h-full before:bg-SecondaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:text-white ${
                s.id === service.id 
                  ? "text-white bg-SecondaryColor-0" 
                  : "text-HeadingColor-0 bg-white"
              }`}>
                <span className="flex items-center gap-3">
                  <FaRegFolderOpen className={`transition-all duration-500 group-hover:text-white ${
                    s.id === service.id ? "text-white" : "text-SecondaryColor-0"
                  }`} />
                  {s.title}
                </span>
                <FaArrowRightLong className="text-white" />
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderDownloads = () => (
    <div className="bg-[#f3f4f8] rounded-md px-4 sm:px-8 lg:px-6 xl:px-8 pt-7 pb-4 mb-7">
      <h4 className="font-Inter font-semibold text-2xl text-HeadingColor-0 pb-3 mb-8 relative before:absolute before:bottom-0 before:left-0 before:w-7 before:h-[2px] before:bg-SecondaryColor-0">
        Downloads
      </h4>
      <ul className="mt-8">
        <li>
          <Link href="/">
            <button className="w-full font-Inter text-left text-white transition-all duration-500 group px-7 py-4 flex items-center justify-between rounded bg-HoverColor-0 mb-3 overflow-hidden z-[1] relative before:absolute before:top-0 before:right-0 before:w-0 before:-z-[1] before:h-full before:bg-SecondaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:text-white">
              <span className="flex items-center gap-3">
                <BsFileEarmarkPdf
                  size={20}
                  className="text-SecondaryColor-0 transition-all duration-500 group-hover:text-white"
                />
                Service Report
              </span>
              <HiDownload size={24} className="text-white" />
            </button>
          </Link>
        </li>
        <li>
          <Link href="/">
            <button className="w-full font-Inter text-left text-white transition-all duration-500 group px-7 py-4 flex items-center justify-between rounded bg-HoverColor-0 mb-3 overflow-hidden z-[1] relative before:absolute before:top-0 before:right-0 before:w-0 before:-z-[1] before:h-full before:bg-SecondaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:text-white">
              <span className="flex items-center gap-3">
                <BsFileEarmarkPdf
                  size={20}
                  className="text-SecondaryColor-0 transition-all duration-500 group-hover:text-white"
                />
                Service List
              </span>
              <HiDownload size={24} className="text-white" />
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );

  const renderContactWidget = () => (
    <div className="rounded-lg px-9 overflow-hidden bg-[url('/images/widget-thumb.png')] bg-cover bg-no-repeat bg-center py-[50px]">
      <Image src={wedgetIcon} alt="Widget Icon" width={48} height={48} />
      <h6 className="font-Inter font-medium text-lg text-white mt-5 mb-2">
        Call Us Anytime
      </h6>
      <Link href="/">
        <button className="font-Inter font-semibold text-2xl text-white">
          +123 (4567) 890
        </button>
      </Link>
      <Link href="/">
        <button className="font-Inter text-white flex items-center mt-4 mb-[52px]">
          <MdEmail className="text-xl text-SecondaryColor-0" />
          example@gmail.com
        </button>
      </Link>
      <Link href="/">
        <button className="font-Inter text-white flex items-center bg-SecondaryColor-0 w-full h-[58px] rounded-md justify-center">
          Contact Us
          <FaArrowRight />
        </button>
      </Link>
    </div>
  );

  const renderServiceContent = () => (
    <div className="col-span-3 lg:col-span-2">
      <h2 className="font-Inter font-bold text-[26px] sm:text-4xl text-HeadingColor-0">
        {service.title}
      </h2>
      <p className="font-Poppins font-light text-TextColor-0 mt-6">
        {service.description}
      </p>
      <p className="font-Poppins font-light text-TextColor-0 mt-7 mb-9">
        {service.shortDescription}
      </p>
      <div className="relative w-full h-[400px]">
        <Image 
          src={service.image}
          alt={service.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
          onError={(e) => {
            console.error('Error loading image:', e);
          }}
        />
      </div>
      <Link href="/book-appointment">
        <button 
          onClick={handleBookNow}
          className="w-full sm:w-auto mt-8 font-Inter text-white flex items-center justify-center gap-2 bg-SecondaryColor-0 px-8 py-4 rounded-md hover:bg-HoverColor-0 transition-all duration-500"
        >
          Book Appointment
          <FaArrowRight />
        </button>
      </Link>
      <h2 className="font-Inter font-bold text-2xl sm:text-3xl text-HeadingColor-0 mt-[74px]">
        What are the Benefits?
      </h2>
      <p className="font-Poppins font-light text-TextColor-0 mt-6">
        {service.qualityDescription}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mt-7">
        {service.benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-5 bg-[#f3f4f8] rounded-md px-6 py-7">
            <div className="w-[72px] h-[72px] rounded-full bg-white flex justify-center items-center">
              <Image 
                src={index === 0 ? projectDetailsIcon : projectDetailsIcon2}
                alt={benefit.title}
                width={48}
                height={48}
              />
            </div>
            <div className="flex-1">
              <h6 className="font-Inter font-semibold text-[22px] text-HeadingColor-0">
                {benefit.title}
              </h6>
              <p className="font-Poppins font-light text-TextColor-0 mt-3">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="font-Inter font-bold text-2xl sm:text-3xl text-HeadingColor-0 mt-[74px]">
        Service Quality
      </h2>
      <p className="font-Poppins font-light text-TextColor-0 mt-6">
        {service.qualityDescription}
      </p>
      <div className="rounded-md overflow-hidden mt-7">
        <CompareImage
          leftImage={service.beforeImage}
          rightImage={service.afterImage}
        />
      </div>
      <ServiceFaq />
    </div>
  );

  const handleBookNow = () => {
    // Map the service ID to match the booking form service IDs
    const serviceIdMap = {
      'house-cleaning': 'regular',
      'deep-cleaning': 'deep',
      'airbnb-cleaning': 'airbnb',
      'office-cleaning': 'office',
      'retail-space-cleaning': 'retail',
      'event-cleaning': 'event'
    };

    // Get the mapped service ID
    const mappedServiceId = serviceIdMap[service.id];
    
    // Set the selected service in context
    selectService(mappedServiceId);
    
    // Navigate to booking page
    router.push('/book-appointment');
  };

  return (
    <>
      <Breadcamp
        breadCampTitle={service.title}
        breadCampLink="Services"
        breadcampIcon={<FaArrowRightLong />}
        breadcampIcon2={<FaArrowRightLong />}
        breadCampContent={service.title}
        url="/services"
      />
      <section className="py-[120px] bg-white">
        <div className="Container">
          <div className="grid grid-cols-3 gap-[70px]">
            <div className="col-span-3 lg:col-span-1">
              {renderServiceCategories()}
              {renderDownloads()}
              {renderContactWidget()}
            </div>
            {renderServiceContent()}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getStaticPaths() {
  const paths = servicesData.services.map((service) => ({
    params: { serviceId: service.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const service = servicesData.services.find((s) => s.id === params.serviceId);

  if (!service) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      service,
    },
    revalidate: 60,
  };
}

export default ServiceDetails; 