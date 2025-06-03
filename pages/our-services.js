import { FaArrowRightLong } from "react-icons/fa6";
import Breadcamp from "../components/Breadcamp";
import { FaCheck, FaClock, FaCalendarAlt, FaBuilding, FaBroom, FaHome, FaStore } from "react-icons/fa";
import { MdCleaningServices, MdEvent } from "react-icons/md";
import Link from "next/link";

const OurServices = () => {
    return (
        <>
            <Breadcamp
                breadCampTitle="Our Services"
                breadCampLink="Home"
                breadcampIcon={<FaArrowRightLong />}
                breadcampIcon2={<FaArrowRightLong />}
                breadCampContent="Our Services"
                url="/"
            />

            {/* Services Section */}
            <section className="py-[120px] bg-white">
                <div className="Container">
                    <div className="text-center mb-16">
                        <h2 className="font-Inter font-bold text-[26px] sm:text-4xl text-HeadingColor-0 mb-4">
                            Our Services
                        </h2>
                        <p className="font-Poppins font-light text-TextColor-0 max-w-2xl mx-auto">
                            We offer a comprehensive range of cleaning services tailored to meet your specific needs, whether for your home, office, or commercial space.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Office Cleaning",
                                description: "Professional cleaning services for offices and workplaces, ensuring a clean and healthy environment for your employees.",
                                icon: <FaBuilding className="text-SecondaryColor-0 text-3xl" />,
                                details: [
                                    "Dusting surfaces",
                                    "Sanitizing high-touch areas",
                                    "Cleaning restrooms",
                                    "Taking out trash",
                                    "Vacuuming and mopping",
                                    "Restocking supplies (if needed)"
                                ]
                            },
                            {
                                title: "Deep Cleaning",
                                description: "Thorough cleaning services that reach every corner, perfect for spring cleaning or preparing for special occasions.",
                                icon: <FaBroom className="text-SecondaryColor-0 text-3xl" />,
                                details: [
                                    "Scrubbing and sanitizing hard-to-reach areas",
                                    "Cleaning baseboards, behind furniture",
                                    "Inside appliances, corners, and more"
                                ]
                            },
                            {
                                title: "Regular House Cleaning",
                                description: "Consistent and reliable cleaning services to maintain your home's cleanliness and comfort.",
                                icon: <FaHome className="text-SecondaryColor-0 text-3xl" />,
                                details: [
                                    "Dusting",
                                    "Vacuuming and mopping",
                                    "Kitchen and bathroom cleaning",
                                    "Wiping surfaces",
                                    "Tidying up"
                                ]
                            },
                            {
                                title: "Event Cleaning",
                                description: "Pre and post-event cleaning services to ensure your venue is spotless for your guests.",
                                icon: <FaCalendarAlt className="text-SecondaryColor-0 text-3xl" />,
                                details: [
                                    "Pre-event preparation and/or post-event cleanup",
                                    "Cleaning floors, surfaces, trash, restrooms",
                                    "Custom cleaning as needed"
                                ]
                            },
                            {
                                title: "Retail Space Cleaning",
                                description: "Specialized cleaning services for retail spaces, maintaining a welcoming environment for your customers.",
                                icon: <FaStore className="text-SecondaryColor-0 text-3xl" />,
                                details: [
                                    "Dusting shelves",
                                    "Cleaning mirrors, floors, windows (interior)",
                                    "Wiping counters and fitting rooms",
                                    "Restroom cleaning"
                                ]
                            }
                        ].map((service, index) => (
                            <div key={index} className="bg-white p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] transition-shadow h-full flex flex-col">
                                <div className="flex flex-col items-center flex-grow">
                                    <div className="w-20 h-20 rounded-full bg-[#f3f4f8] flex items-center justify-center mb-6">
                                        {service.icon}
                                    </div>
                                    <h3 className="font-Inter font-semibold text-xl text-HeadingColor-0 mb-4 text-center">
                                        {service.title}
                                    </h3>
                                    <p className="font-Poppins font-light text-TextColor-0 mb-6 text-center leading-relaxed">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-2 mb-6 w-full">
                                        {service.details.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-2 leading-relaxed">
                                                <FaCheck className="text-SecondaryColor-0 flex-shrink-0" />
                                                <span className="font-Poppins">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-auto pt-4">
                                        <Link 
                                            href={`/service-details/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="inline-block bg-SecondaryColor-0 text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors duration-300"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Information Section */}
            <section className="py-[120px] bg-[#f3f4f8]">
                <div className="Container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Duration Estimates */}
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <h3 className="font-Inter font-semibold text-2xl text-HeadingColor-0 mb-4">Duration Estimates</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <FaClock className="text-SecondaryColor-0 text-xl" />
                                <span className="font-Poppins">Minimum Booking: 2 hours per service</span>
                            </div>
                        </div>

                        {/* Optional Add-ons */}
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <h3 className="font-Inter font-semibold text-2xl text-HeadingColor-0 mb-4">Optional Add-ons</h3>
                            <ul className="space-y-2">
                                {[
                                    "Window Cleaning: +£5.00 (Price may vary by window size/number)",
                                    "Ironing",
                                    "Oven Cleaning",
                                    "Fridge Cleaning",
                                    "Inside Cupboard Cleaning"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <FaCheck className="text-SecondaryColor-0" />
                                        <span className="font-Poppins">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Operating Hours */}
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <h3 className="font-Inter font-semibold text-2xl text-HeadingColor-0 mb-4">Operating Hours</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FaCalendarAlt className="text-SecondaryColor-0 text-xl" />
                                    <span className="font-Poppins">Monday – Sunday</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaClock className="text-SecondaryColor-0 text-xl" />
                                    <span className="font-Poppins">8:00 AM to 7:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OurServices; 