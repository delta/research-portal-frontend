import AreaOfResearch from "./AreaOfResearch"
import Centers from "./Centers"
import Content from "./Content"
import Departments from "./Departments"
import Footer from "./Footer"
import Landing from "./Landing"
import Overview from "./Overview"
import Portfolio from "./Portfolio"

const Home = () => {
  return <div className='w-ful bg-red-50 relative'>
      <Landing/>
      <Overview/>
      <Content/>
      <AreaOfResearch/>
      <Departments/>
      <Centers/>
      <Portfolio/>
      <Footer/>
  </div>;
};

export default Home;
