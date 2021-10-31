import * as React from "react"
import { useState, useEffect } from 'react'
/*-----------------COMPONENTS---------------------*/
import Layout from "../components/layout"
import { data } from '../context/works'
import { gsap } from 'gsap'
import Link from 'gatsby-link'
import Seo from "../components/seo"
import Hero from '../components/Hero'
import Slider from "../components/Slider"
import Service from "../components/Service"

const IndexPage:React.FC = (): JSX.Element => {
  const [isSet,setIsSet] = useState(false)
  const [current,setCurrent] = useState([])
  const [isContent,setIsContent] = useState(false)
  
  const handleService = (id:string) =>{
    let category = data.find(item => item.category === id)
    setCurrent(category.slides)
    setIsContent(true)
    
    let tl = gsap.timeline()
  }

  const handleClose = (e:any) =>{
    setIsContent(false)
  }
  useEffect(()=>{},[current])
      return(
      <Layout>
          <Seo title="Home" />
          <Hero />
          <div className="home__main">
            <div className="home__portfolio" id="portfolio">
                <h3>My idealogy is ti engage my best skills and technology in the process of design</h3>
                <h2>to make your ideas evolve</h2>
                <Slider />
            </div>
            <div className="home__services" id="services">
              <h3>As a proffessional, I can provide a wide range of services to make sure you have</h3>
              <h2>everything under control</h2>
              <div className="home__service-wrapper">
                <Service handleService = {handleService} id={'UX/UI'} icon={"/icon-1.png"} number="01" title="UX/UI" text="Through research to prepare the best solutions"  />
                <Service handleService = {handleService} id={'Websites'} icon={"/icon-2.png"} number="02" title="Web Design" text="Full responsive equipped with modern technology"  />
                <Service handleService = {handleService} id={'Applications'} icon={"/icon-3.png"} number="03" title="Applications" text="Idinvidualy planned solutions to provide best answers to your problems and needs" />
                <Service handleService = {handleService} id={'E-commerce'} icon={"/icon-4.png"} number="04" title="E-commerce" text="Best UX/UI design for your E-commerce" />
            </div>
              {isContent && 
              <div className="home__service-content">
                <div className="home__service-close" onClick={(e)=>{handleClose(e)}}>
                  <span></span>
                  <span></span>
                </div>
                  {current.map(slide => <Link to="#"><img src={`${slide}`} /></Link>)}
              </div>}
            </div>
          </div>
      </Layout>
    )
}

export default IndexPage
