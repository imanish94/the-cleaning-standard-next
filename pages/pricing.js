import { FaArrowRightLong } from "react-icons/fa6";
import Breadcamp from "../components/Breadcamp";
import { FaCheck, FaClock, FaPoundSign, FaPlus } from "react-icons/fa";
import { MdCleaningServices } from "react-icons/md";
import { motion } from "framer-motion";

const Pricing = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    const cardVariants = {
        hover: {
            y: -10,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <>
            <Breadcamp
                breadCampTitle="Pricing"
                breadCampLink="Home"
                breadcampIcon={<FaArrowRightLong />}
                breadcampIcon2={<FaArrowRightLong />}
                breadCampContent="Pricing"
                url="/"
            />

            {/* Pricing Section */}
            <section className="py-[120px] bg-white">
                <div className="Container">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-Inter font-bold text-[26px] sm:text-4xl text-HeadingColor-0 mb-4">
                            Our Pricing
                        </h2>
                        <p className="font-Poppins font-light text-TextColor-0 max-w-2xl mx-auto">
                            Transparent and competitive pricing for all our cleaning services. Choose the service that best fits your needs.
                        </p>
                    </motion.div>

                    {/* Hourly Rates */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-16"
                    >
                        <motion.h3 
                            variants={itemVariants}
                            className="font-Inter font-semibold text-2xl text-HeadingColor-0 mb-8 text-center"
                        >
                            Hourly Rates
                        </motion.h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Regular Residential Cleaning",
                                    price: "£18.00",
                                    period: "per hour",
                                    features: [
                                        "Standard cleaning services",
                                        "Regular maintenance",
                                        "Basic cleaning tasks"
                                    ]
                                },
                                {
                                    title: "Deep Cleaning",
                                    price: "£20.00",
                                    period: "per hour",
                                    features: [
                                        "Thorough cleaning",
                                        "Detailed attention",
                                        "Comprehensive service"
                                    ]
                                },
                                {
                                    title: "Move-in/Move-out Cleaning",
                                    price: "£25.00-£35.00",
                                    period: "per hour",
                                    features: [
                                        "End-of-tenancy cleaning",
                                        "Complete property cleaning",
                                        "Detailed inspection"
                                    ]
                                }
                            ].map((rate, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover="hover"
                                    className="bg-white p-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(0,0,0,0.15)] transition-all duration-300"
                                >
                                    <div className="text-center">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <h4 className="font-Inter font-semibold text-xl text-HeadingColor-0 mb-4">
                                                {rate.title}
                                            </h4>
                                            <div className="mb-6">
                                                <span className="font-Inter font-bold text-3xl text-SecondaryColor-0">
                                                    {rate.price}
                                                </span>
                                                <span className="font-Poppins text-TextColor-0 ml-2">
                                                    {rate.period}
                                                </span>
                                            </div>
                                        </motion.div>
                                        <ul className="space-y-3">
                                            {rate.features.map((feature, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <FaCheck className="text-SecondaryColor-0 flex-shrink-0" />
                                                    <span className="font-Poppins">{feature}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Additional Information */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        {/* Duration Estimates */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="bg-[#f3f4f8] p-8 rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                            <h3 className="font-Inter font-semibold text-2xl text-HeadingColor-0 mb-6">
                                Duration Estimates
                            </h3>
                            <motion.div 
                                whileHover={{ x: 10 }}
                                className="flex items-center gap-3"
                            >
                                <FaClock className="text-SecondaryColor-0 text-xl" />
                                <span className="font-Poppins">Minimum Booking: 2 hours per service</span>
                            </motion.div>
                        </motion.div>

                        {/* Optional Add-ons */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="bg-[#f3f4f8] p-8 rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                            <h3 className="font-Inter font-semibold text-2xl text-HeadingColor-0 mb-6">
                                Optional Add-ons
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Window Cleaning: +£5.00 (Price may vary by window size/number)",
                                    "Ironing",
                                    "Oven Cleaning",
                                    "Fridge Cleaning",
                                    "Inside Cupboard Cleaning"
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-2"
                                    >
                                        <FaPlus className="text-SecondaryColor-0 flex-shrink-0" />
                                        <span className="font-Poppins">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Pricing; 