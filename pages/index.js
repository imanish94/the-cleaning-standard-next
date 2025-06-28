import Head from 'next/head';
import Banner from '../components/Banner';
import Feature from '../components/Feature';
import About from '../components/AboutUs';
import Services from '../components/Services';
import TeamMember from '../components/TeamMember';
import Process from '../components/Process';
import { getServices } from '@/utils/api/common';

export default function Home({ services }) {
  return (
    <>
      <Head>
        <title>The Cleaning Standard - Professional Cleaning Services</title>
        <meta name="description" content="Professional cleaning services for homes, offices, Airbnb properties, and commercial spaces. Deep cleaning, regular maintenance, and specialized cleaning solutions." />
        <meta name="keywords" content="cleaning services, house cleaning, office cleaning, Airbnb cleaning, deep cleaning, commercial cleaning, professional cleaners, cleaning company" />
        
        {/* Open Graph */}
        <meta property="og:title" content="The Cleaning Standard - Professional Cleaning Services" />
        <meta property="og:description" content="Professional cleaning services for homes, offices, Airbnb properties, and commercial spaces. Deep cleaning, regular maintenance, and specialized cleaning solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/blue-icon-brand.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Cleaning Standard - Professional Cleaning Services" />
        <meta name="twitter:description" content="Professional cleaning services for homes, offices, Airbnb properties, and commercial spaces. Deep cleaning, regular maintenance, and specialized cleaning solutions." />
        <meta name="twitter:image" content="/images/blue-icon-brand.png" />
      </Head>
      
      {/* Banen Section */}
      <Banner />
      {/* Feature Section */}
      <Feature services={services}/>
      {/* About Us Section */}
      <About services={services}/>
      {/* Services Section */}
      <Services services={services}/>
      {/* Process Section */}
      <Process/>
      {/* Team Section */}
      <TeamMember/>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const servicesData = await getServices();

    return {
      props: {
        services: servicesData.data || []
      }
    };
  } catch (error) {
    return {
      props: {
        services: []
      }
    };
  }
}
