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
