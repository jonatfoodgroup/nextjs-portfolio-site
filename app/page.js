import Header from "./components/Header";
import ProcessSteps from "./components/ProcessSteps";
import LogoWall from "./components/LogoWall";
import Footer from "./components/marketing/Footer";
import SoftwareList from "./components/SoftwareList";
import ServiceList from "./components/ServicesList";
import LatestArticles from "./components/LatestArticles";
import Masthead from "./components/Masthead";

export default function Home() {
  return (
    <>
      <Header />
      <Masthead />
      <LatestArticles />
      <LogoWall />
      <div className="bg-light-blue py-8 md:py-8">
        <ServiceList />
      </div>
      <div className="bg-light-blue py-8 md:py-16">
        <ProcessSteps />
      </div>
      <SoftwareList />
      <Footer />
    </>
  );
}
