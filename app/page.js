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
      <LogoWall />

      <div className="container mx-auto mt-4 md:mt-0 inner-container">
      <ServiceList />

        <ProcessSteps />
        {/* <OurProcess /> */}
        <SoftwareList />
      </div>

      

      <Footer />
    </>
  );
}
