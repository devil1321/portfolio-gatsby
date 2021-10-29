import * as React from "react"

/*-----------------COMPONENTS---------------------*/
import Layout from "../components/layout"
import Seo from "../components/seo"
import Hero from '../components/Hero'
import Slider from "../components/Slider"


const IndexPage:React.FC = (): JSX.Element => (
  <Layout>
      <Seo title="Home" />
      <Hero />
      <div className="home__main">
        <div className="home__portfolio" id="portfolio">
            <h3>My idealogy is ti engage my best skills and technology in the process of design</h3>
            <h2>to make your ideas evolve</h2>
            <Slider />
        </div>
      </div>
  </Layout>
)


export default IndexPage
