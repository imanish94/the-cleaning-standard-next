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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://thecleaningstandard.com/contact" />
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
