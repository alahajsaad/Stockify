import HeroSection from "./HeroSection"
import Navbar from "./navbar"

const LandingLayout = () => {
  return (
    <div className="h-screen overflow-hidden">
    <Navbar />
    <HeroSection />
  </div>
  )
}

export default LandingLayout