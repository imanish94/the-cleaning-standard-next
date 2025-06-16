import Link from "next/link";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { quoteRequest } from "../utils/api/common";

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]*$/.test(formData.name.trim())) {
      newErrors.name = "Name should only contain letters and spaces";
    }

    // Phone validation for UK numbers
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      // Remove all non-digit characters for validation
      const phoneDigits = formData.phone.replace(/\D/g, '');
      
      // Check if number starts with 0 or +44
      const isUKNumber = phoneDigits.startsWith('44') || phoneDigits.startsWith('0');
      
      if (!isUKNumber) {
        newErrors.phone = "Please enter a valid UK phone number";
      } else {
        // Remove 0 or 44 prefix for length check
        const numberWithoutPrefix = phoneDigits.startsWith('44') 
          ? phoneDigits.substring(2) 
          : phoneDigits.substring(1);
          
        if (numberWithoutPrefix.length !== 10) {
          newErrors.phone = "UK phone number must be 10 digits after the prefix";
        }
      }
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    // Message validation (optional but with length check if provided)
    if (formData.message && formData.message.trim().length > 500) {
      newErrors.message = "Message should not exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters except + for initial formatting
    let phoneNumber = value.replace(/[^\d+]/g, '');
    
    // Handle +44 prefix
    if (phoneNumber.startsWith('+44')) {
      phoneNumber = phoneNumber.substring(3); // Remove +44
    }
    
    // Handle 0 prefix
    if (phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.substring(1); // Remove 0
    }

    // Format the number
    if (phoneNumber.length <= 4) {
      return phoneNumber;
    } else if (phoneNumber.length <= 7) {
      return `+44 ${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4)}`;
    } else {
      return `+44 ${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    handleChange({
      target: {
        name: 'phone',
        value: formattedNumber
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await quoteRequest(formData);
      if (response.status) {
        setSuccess("Your quote request has been submitted successfully!");
        setFormData({
          name: "",
          phone: "",
          service: "",
          message: ""
        });
        setErrors({});
      } else {
        setErrors({
          submit: response.message || "Something went wrong. Please try again."
        });
      }
    } catch (err) {
      setErrors({
        submit: "Failed to submit quote request. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pb-40 bg-[#f3f4f8] relative z-10">
      <div className="Container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 2xl:gap-[142px]">
          <div className="mt-28">
            <h5 className="font-Inter font-medium text-SecondaryColor-0">
              OUR SERVICES
            </h5>
            <h1 className="font-Inter font-bold text-[20px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[30px] lg:leading-[42px] xl:text-[35px] xl:leading-[45px] 2xl:text-[42px] 2xl:leading-[52px] text-HeadingColor-0 mt-3">
              Professional Cleaning Services <br /> For Your Home & Office
            </h1>
            <div className="flex flex-col sm:flex-row gap-7 mt-12">
              <div>
                <Image 
                  src="/images/contact-icon.png"
                  alt="Contact Icon"
                  width={60}
                  height={60}
                />
              </div>
              <div className="flex-1">
                <h5 className="font-Inter font-semibold text-[22px] text-HeadingColor-0">
                  Residential Cleaning
                </h5>
                <p className="font-Poppins text-TextColor-0 opacity-70 mt-3">
                  Professional home cleaning services tailored to your needs
                  <br className="hidden sm:block lg:hidden xl:block" />
                  ensuring a spotless and healthy living environment
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-7 mt-7">
              <div>
                <Image 
                  src="/images/contact-icon2.png"
                  alt="Contact Icon 2"
                  width={60}
                  height={60}
                />
              </div>
              <div className="flex-1">
                <h5 className="font-Inter font-semibold text-[22px] text-HeadingColor-0">
                  Commercial Cleaning
                </h5>
                <p className="font-Poppins text-TextColor-0 opacity-70 mt-3">
                  Comprehensive office and commercial space cleaning
                  <br className="hidden sm:block lg:hidden xl:block" />
                  maintaining a professional and hygienic workspace
                </p>
              </div>
            </div>
            <Link href="/services">
              <button className="primary-btn mt-12">
                View All Services
                <FaArrowRightLong size={20} />
              </button>
            </Link>
          </div>
          <div className="flex lg:justify-end -mt-8">
            <div className="bg-SecondaryColor-0 w-full lg:max-w-[430px] rounded-md pt-10 pb-[60px]">
              <div className="text-center">
                <h1 className="font-Inter font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[35px] xl:leading-[45px] 2xl:text-[44px] 2xl:leading-[54px] text-white">
                  Contact Us
                </h1>
              </div>
              {errors.submit && (
                <div className="mt-4 px-5 sm:px-[60px]">
                  <p className="text-red-500 text-center">{errors.submit}</p>
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-[22px] items-center mt-9 px-5 sm:px-[60px]"
              >
                <div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Name*"
                    className={`w-full bg-transparent text-white placeholder:text-white border ${errors.name ? 'border-red-500' : 'border-white'} outline-0 h-[57px] rounded py-3 px-6`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="Phone Number*"
                    className={`w-full bg-transparent text-white placeholder:text-white border ${errors.phone ? 'border-red-500' : 'border-white'} outline-0 h-[57px] rounded py-3 px-6`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <select
                    name="service"
                    id="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full bg-transparent text-white border ${errors.service ? 'border-red-500' : 'border-white'} outline-0 h-[57px] rounded py-3 px-6`}
                  >
                    <option value="" className="text-HoverColor-0">
                      Select Service*
                    </option>
                    <option value="house" className="text-HoverColor-0">
                      House Cleaning
                    </option>
                    <option value="deep" className="text-HoverColor-0">
                      Deep Cleaning
                    </option>
                    <option value="airbnb" className="text-HoverColor-0">
                      Airbnb Cleaning
                    </option>
                    <option value="office" className="text-HoverColor-0">
                      Office Cleaning
                    </option>
                    <option value="retail" className="text-HoverColor-0">
                      Retail Cleaning
                    </option>
                    <option value="event" className="text-HoverColor-0">
                      Event Cleaning
                    </option>
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-sm mt-1">{errors.service}</p>
                  )}
                </div>
                <div>
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className={`w-full bg-transparent text-white resize-none placeholder:text-white border ${errors.message ? 'border-red-500' : 'border-white'} outline-0 h-[120px] rounded py-3 px-6`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-PrimaryColor-0 border border-transparent font-medium font-Inter transition-all duration-500 hover:text-white text-TextColor-0 hover:border-white outline-0 h-[60px] rounded py-3 flex items-center justify-center gap-2 relative z-10 overflow-hidden before:absolute before:top-0 before:right-0 before:w-0 before:h-full before:bg-SecondaryColor-0 before:-z-10 before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Send Message"} <FaArrowRightLong />
                </button>
              </form>
              {success && (
                <div className="mt-6 px-5 sm:px-[60px]">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 text-2xl flex-shrink-0" />
                    <div>
                      <h4 className="text-green-800 font-semibold">Request Submitted Successfully!</h4>
                      <p className="text-green-600 text-sm mt-1">
                        Thank you for contacting us. We&apos;ll get back to you shortly with your quote.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
