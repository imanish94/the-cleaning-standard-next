import { FaArrowRightLong } from "react-icons/fa6";
import Layout from "../components/Layout";
import Breadcamp from "../components/Breadcamp";
import Image from "next/image";
import { FaCheck, FaBuilding, FaHome, FaCalendarAlt, FaStore, FaBroom } from "react-icons/fa";
import { MdCleaningServices, MdVerifiedUser, MdSupportAgent, MdEco } from "react-icons/md";
import Link from "next/link";
import Process from "@/components/Process";

const AboutInner = () => {
    return (
    <>
        <Breadcamp
        breadCampTitle="About Us"
        breadCampLink="Home"
          breadcampIcon={<FaArrowRightLong />}
        breadcampIcon2={<FaArrowRightLong />}
        breadCampContent="About Us"
        url="/"
      />
      
      {/* Company Introduction Section */}
      <section className="py-[120px] bg-white">
        <div className="Container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[70px] items-center">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070"
                alt="The Cleaning Standard Team"
                width={600}
                height={500}
                className="rounded-lg"
              />
              <div className="absolute -bottom-10 -left-10 bg-SecondaryColor-0 p-8 rounded-lg text-white">
                <h3 className="text-4xl font-bold mb-2">15+</h3>
                <p className="text-lg">Years Experience</p>
              </div>
            </div>
            <div>
              <h2 className="font-Inter font-bold text-[26px] sm:text-4xl text-HeadingColor-0 mb-6">
                Welcome to The Cleaning Standard
              </h2>
              <p className="font-Poppins font-light text-TextColor-0 mb-6">
                At The Cleaning Standard, we do more than clean – we set the benchmark for excellence. We connect busy households and workplaces with verified professional cleaners, offering a seamless online booking experience.
              </p>
              <p className="font-Poppins font-light text-TextColor-0 mb-8">
                Our commitment to quality, attention to detail, and customer satisfaction sets us apart in the industry. We take pride in our trained professionals who use eco-friendly products and advanced cleaning techniques to ensure the highest standards of cleanliness.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MdCleaningServices className="text-SecondaryColor-0 text-2xl" />
                  <span className="font-Poppins">Professional Team</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdEco className="text-SecondaryColor-0 text-2xl" />
                  <span className="font-Poppins">Eco-Friendly Products</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdVerifiedUser className="text-SecondaryColor-0 text-2xl" />
                  <span className="font-Poppins">Satisfaction Guaranteed</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdSupportAgent className="text-SecondaryColor-0 text-2xl" />
                  <span className="font-Poppins">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-[120px] bg-[#f3f4f8]">
        <div className="Container">
          <div className="text-center mb-16">
            <h2 className="font-Inter font-bold text-[26px] sm:text-4xl text-HeadingColor-0 mb-4">
              Our Mission & Values
            </h2>
            <p className="font-Poppins font-light text-TextColor-0 max-w-3xl mx-auto">
              To provide high-quality, accessible, and reliable cleaning services. With a team of experienced and trusted professionals, we deliver spotless results using industry-leading techniques and eco-conscious products.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="font-Inter font-semibold text-2xl text-HeadingColor-0 mb-4">Our Mission</h3>
              <p className="font-Poppins font-light text-TextColor-0 mb-4">
                Whether it&apos;s a one-off deep clean, regular office maintenance, or end-of-tenancy services, our mission is simple: to raise the standard of clean.
              </p>
              <p className="font-Poppins font-light text-TextColor-0">
                Let us take care of the mess, so you can focus on what matters most.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="font-Inter font-semibold text-2xl text-HeadingColor-0 mb-4">Our Team</h3>
              <p className="font-Poppins font-light text-TextColor-0">
                Our team is the heart of The Cleaning Standard — dependable, detail-oriented, and dedicated to delivering excellence with every clean. We don&apos;t just hire cleaners; we build a team of professionals who take pride in setting a new standard for cleanliness and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
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
                icon: <FaBuilding className="text-SecondaryColor-0 text-3xl" />
              },
              {
                title: "Deep Cleaning",
                description: "Thorough cleaning services that reach every corner, perfect for spring cleaning or preparing for special occasions.",
                icon: <FaBroom className="text-SecondaryColor-0 text-3xl" />
              },
              {
                title: "Regular House Cleaning",
                description: "Consistent and reliable cleaning services to maintain your home's cleanliness and comfort.",
                icon: <FaHome className="text-SecondaryColor-0 text-3xl" />
              },
              {
                title: "Event Cleaning",
                description: "Pre and post-event cleaning services to ensure your venue is spotless for your guests.",
                icon: <FaCalendarAlt className="text-SecondaryColor-0 text-3xl" />
              },
              {
                title: "Retail Space Cleaning",
                description: "Specialized cleaning services for retail spaces, maintaining a welcoming environment for your customers.",
                icon: <FaStore className="text-SecondaryColor-0 text-3xl" />
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

      {/* Why Choose Us Section */}
      <section className="py-[120px] bg-[#f3f4f8]">
        <div className="Container">
          <div className="text-center mb-16">
            <h2 className="font-Inter font-bold text-[26px] sm:text-4xl text-HeadingColor-0 mb-4">
              Why Choose The Cleaning Standard?
            </h2>
            <p className="font-Poppins font-light text-TextColor-0 max-w-2xl mx-auto">
              We are committed to providing the highest quality cleaning services with a focus on customer satisfaction and environmental responsibility.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Experienced Team",
                description: "Our cleaning professionals are highly trained and experienced in all aspects of cleaning.",
                icon: <MdCleaningServices className="text-SecondaryColor-0 text-3xl group-hover:text-SecondaryColor-0" />
              },
              {
                title: "Eco-Friendly",
                description: "We use environmentally friendly cleaning products that are safe for your family and pets.",
                icon: <MdEco className="text-SecondaryColor-0 text-3xl group-hover:text-SecondaryColor-0" />
              },
              {
                title: "Reliable Service",
                description: "Count on us for consistent, high-quality cleaning services every time.",
                icon: <MdVerifiedUser className="text-SecondaryColor-0 text-3xl group-hover:text-SecondaryColor-0" />
              },
              {
                title: "Customer Focus",
                description: "Your satisfaction is our priority. We listen to your needs and deliver accordingly.",
                icon: <MdSupportAgent className="text-SecondaryColor-0 text-3xl group-hover:text-SecondaryColor-0" />
              }
            ].map((feature, index) => (
              <div key={index} className="rounded-md bg-SecondaryColor-0 p-6 flex flex-col items-center gap-6 group hover:bg-PrimaryColor-0 transition-colors duration-300">
                <div className="w-[85px] h-[85px] rounded-full bg-white relative flex justify-center items-center">
                  {feature.icon}
                </div>
                <div className="text-center">
                  <h3 className="font-Inter font-bold text-white text-xl mb-2 group-hover:text-SecondaryColor-0 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="font-Poppins font-light text-white/80 group-hover:text-SecondaryColor-0/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        <Process/>

    </>
    );
};

export default AboutInner;