import { FaArrowRightLong } from "react-icons/fa6";
import Head from 'next/head';
import Breadcamp from "@/components/Breadcamp";
import Appointment from "@/components/Appointment";
import ContactLocation from "@/components/ContactLocation";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us | The Cleaning Standard</title>
        <meta name="description" content="Get in touch with The Cleaning Standard. We're here to help with all your cleaning needs. Contact us for quotes, appointments, or any questions." />
        <meta name="keywords" content="contact cleaning services, cleaning quote, cleaning appointment, cleaning company contact" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://thecleaningstandard.com/contact" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contact Us | The Cleaning Standard" />
        <meta property="og:description" content="Get in touch with The Cleaning Standard. We're here to help with all your cleaning needs. Contact us for quotes, appointments, or any questions." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/blue-icon-brand.png" />
        <meta property="og:url" content="https://thecleaningstandard.com/contact" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | The Cleaning Standard" />
        <meta name="twitter:description" content="Get in touch with The Cleaning Standard. We're here to help with all your cleaning needs. Contact us for quotes, appointments, or any questions." />
        <meta name="twitter:image" content="/images/blue-icon-brand.png" />
      </Head>
      
      <main className="contact-page">
        <Breadcamp
          breadCampTitle="Contact Us"
          breadcampIcon={<FaArrowRightLong />}
          breadCampContent="Get in touch with us"
          url="/contact"
        />
        <Appointment />
        <ContactLocation />
      </main>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {}
  };
}

export default ContactPage;
