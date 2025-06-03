import Banner from '../components/Banner';
import Feature from '../components/Feature';
import About from '../components/AboutUs';
import Services from '../components/Services';
import TeamMember from '../components/TeamMember';
import Process from '../components/Process';
export default function Home() {
  return (
    <>
      {/* Banen Section */}
      <Banner />
      {/* Feature Section */}
      <Feature/>
      {/* About Us Section */}
      <About/>
      {/* Services Section */}
      <Services/>
      {/* Process Section */}
      <Process/>
      {/* Team Section */}
      <TeamMember/>
   
    </>
  );
}
