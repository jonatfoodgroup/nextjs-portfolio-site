import Header from "./components/Header";
import OurProcess from "./components/OurProcess";
import ProcessSteps from "./components/ProcessSteps";
import Masthead from "./components/Masthead";
import LogoWall from "./components/LogoWall";
import Footer from "./components/marketing/Footer";
import SoftwareList from "./components/SoftwareList";
import ServiceList from "./components/ServicesList";

export default function Home() {
  return (
    <>
      <Header />
      <Masthead />
      
      <div className="container mx-auto pt-24">
      <LogoWall />
        <ProcessSteps />
        <ServiceList />
        {/* <OurProcess /> */}
        <SoftwareList />
      </div>

      

      <Footer />
    </>
  );
}
