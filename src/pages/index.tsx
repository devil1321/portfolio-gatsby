import * as React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'
import { data } from "../context/works";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


/*-----------------COMPONENTS---------------------*/
import Link from "gatsby-link";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import Service from "../components/Service";

const IndexPage: React.FC = (): JSX.Element => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const [current, setCurrent] = useState<any[]>([]);
  const [isContent, setIsContent] = useState<boolean>(false);
  const [isForm,setIsForm] = useState<boolean>(false)
  const [isError,setIsError] = useState<boolean>(false)
  const [isSend,setIsSend] = useState<boolean>(false)
  const [category, setCategory] = useState<string>("");
  const [move,setMove] = useState<number>(-20)
  const [count,setCount] = useState<number>(0)
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    message:''
  })
  const handleService = (): void => {
    gsap.registerPlugin(ScrollTrigger);
    const items = document.querySelectorAll(".item");
    const tl = gsap.timeline();
    tl.fromTo(
      ".service.left",
      { x: -800 },
      {
        x: 0,
        stagger: 0.2,
        force3D:true,
        scrollTrigger: {
          trigger: ".service",
          start: "-500px",
          end: "-400px",
          scrub: 6,
        },
      }
    ),
      tl.fromTo(
        ".service.right",
        { x: 800 },
        {
          x: 0,
          stagger: 0.2,
          force3D:true,
          scrollTrigger: {
            trigger: ".service",
            start: "-500px",
            end: "-400px",
            scrub: 6,
          },
        }
      );
  };

  const handleServiceOpen = (id: string): void => {
    let category = data.find((item) => item.category === id);
    setCategory(id);
    var height: number;

    if (id === "UX/UI"){
      height = 350
    } else if(id === "E-commerce") {
      height = 150;
    }
    else if (id === "Websites") {
      height = 470;
    } else if (id === "Applications") {
      height = 310;
    }

    setCurrent(category.slides);
  

    let tl = gsap.timeline();
    tl.fromTo(
      ".home__service-content",
      { width: "0px", height: "10px", force3D:true },
      { width: "100%", height: "10px", force3D:true, duration: 1 }
    ).fromTo(
      ".home__service-content",
      { height: "2px", padding: "0px" ,force3D:true },
      { height: `${height}px`, padding: "20px", force3D:true, duration: 1, delay: 0.4 }
    );
  };

  const handleServiceClose = (): void => {
    var height: number;
    if (category === "UX/UI") {
      height = 350;
    }else if(category === "E-commerce"){
      height = 350;
    }
    else if (category === "Websites") {
      height = 470;
    } else if (category === "Applications") {
      height = 310;
    }
    let tl = gsap.timeline();
    tl.fromTo(
      ".home__service-content",
      { height: `${height}`, padding: "20px", force3D:true },
      { height: `10px`, padding: "0px", force3D:true, duration: 1 }
    ).fromTo(
      ".home__service-content",
      { width: "100%", height: "10px", force3D:true },
      { width: "0px", height: "0px", force3D:true, duration: 1 }
    );

    setTimeout(() => {
      setIsContent(false);
    }, 2400);
  };

  const handleProjects = () => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline();
    tl.fromTo(
      ".home__projects-image-1",
      { x: -800, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.2,
        force3D:true,
        scrollTrigger: {
          trigger: "#projects",
          start: "-300px",
          end: "-200px",
          scrub: 6,
        },
      }
    ),
      tl.fromTo(
        ".home__projects-image-2",
        { x: 800, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          force3D:true,
          stagger: 0.2,
          scrollTrigger: {
            trigger: "#projects",
            start: "-300px",
            end: "-200px",
            scrub: 6,
          },
        }
      ),
      tl.fromTo(
        ".home__projects-image-3",
        { y: 800, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          force3D:true,
          scrollTrigger: {
            trigger: "#projects",
            start: "-300px",
            end: "-200px",
            scrub: 6,
          },
        }
      );
  };

  const handleMoveCarousel = () =>{
    const carousel = document.querySelector<HTMLDivElement>('.home__clients-carousel')
    carousel.style.transform = `translate(${move}px)`
  }

  const handleCarousel = () =>{
    const carousel = document.querySelector<HTMLDivElement>('.home__clients-carousel')
    const item = document.querySelector<HTMLDivElement>('.home__clients-item')
      let margin: number
      if(window.innerWidth < 736){
        margin = 100
      }else{
        margin = 200
      }
      if(count < 3){
        setMove(move - (item.clientWidth + margin))
        setCount(count + 1)
       
        carousel.style.transition = 'all 1s ease-in-out'
      }else {
        carousel.style.transition = 'none'
        carousel.style.transform = `translate(${-20}px)`
        setMove(-20)
        setCount(0)
      }
  }

  const handleFormLine = (e:any) =>{
    const fields = document.querySelectorAll('.home__field')
    fields.forEach(field => field.classList.remove('active'))
    e.target.parentElement.classList.add('active')
  }

  const handleChange = (e) =>{
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  } 
  const handleSubmit = (e) =>{
 
    e.preventDefault()
    const email = validateEmail(formData.email)

    if(email){  
      axios.post('https://portfolionodemailer.herokuapp.com/send-mail',formData)
      // axios.post('http://localhost:8080/send-mail',formData)
        .then(res => {console.log('res',res)})
        .catch(err => {console.log(err)})
    }else{
      setIsError(true)
      setTimeout(()=>{
        setIsError(false)
      },2000)
    }
  }

  const handleFormAppears = () =>{
    const tl = gsap.timeline()
    tl.to('.home__form',{width:window.innerWidth <= 768 ? "95%" : '60%',border:'2px solid white', force3D:true,duration:1})
      .to('.home__form',{height:'650px', force3D:true,duration:1})
  }
  const handleFormDisappears = () =>{
    const tl = gsap.timeline()
    tl.to('.home__form',{height:'0px',border:'2px solid white', force3D:true,duration:1})
      .to('.home__form',{width:'0px', force3D:true,duration:1})
      .to('.home__form',{border:'0px',force3D:true})
  }

  useEffect(() => {
    console.log(formData)
    if(!isSet){
      handleService();
      handleProjects();
      setIsSet(true)
    }
    setTimeout(()=>{
      handleCarousel()
    },3000) 
      handleMoveCarousel()
  }, [count]);
  return (
    <Layout>
      <Seo title="Home" />
      <Hero />
      <div className="home__main">
        <div className="home__portfolio" id="portfolio">
          <h3>
            My idealogy is ti engage my best skills and technology in the
            process of design
          </h3>
          <h2>to make your ideas evolve</h2>
          <Slider />
        </div>
        <div className="home__services" id="services">
          <h3>
            As a proffessional, I can provide a wide range of services to make
            sure you have
          </h3>
          <h2>everything under control</h2>
          <div className="home__service-wrapper">
            <Service
              handleServiceOpen={handleServiceOpen}
              id={"UX/UI"}
              from="left"
              icon={"/icon-1.png"}
              number="01"
              title="UX/UI"
              text="Through research to prepare the best solutions"
            />
            <Service
              handleServiceOpen={handleServiceOpen}
              id={"Websites"}
              from="right"
              icon={"/icon-2.png"}
              number="02"
              title="Web Design"
              text="Full responsive equipped with modern technology"
            />
            <Service
              handleServiceOpen={handleServiceOpen}
              id={"Applications"}
              from="left"
              icon={"/icon-3.png"}
              number="03"
              title="Applications"
              text="Idinvidualy planned solutions to provide best answers to your problems and needs"
            />
            <Service
              handleServiceOpen={handleServiceOpen}
              id={"E-commerce"}
              from="right"
              icon={"/icon-4.png"}
              number="04"
              title="E-commerce"
              text="Best UX/UI design for your E-commerce"
            />
          </div>
         
            <div className="home__service-content">
              <div
                className="home__service-close"
                onClick={() => {
                  handleServiceClose();
                }}
              >
                <span></span>
                <span></span>
              </div>
              {current.map((slide) => (
                <Link to="#">
                  <img src={`${slide}`} />
                </Link>
              ))}
            </div>
         
        </div>
        <div className="home__projects" id="projects">
          <h2>Projects</h2>
          <img
            className="home__projects-image-1"
            src="/e-commerce/sale-hub.png"
            alt=""
          />
          <img
            className="home__projects-image-2"
            src="/applications/wheather-app.png"
            alt=""
          />
          <img
            className="home__projects-image-3"
            src="/websites/free-landing-page.png"
            alt=""
          />
        </div>
        <div className="home__technology" id="technology">
          <h2>Technology by all means</h2>
          <p>
            I have essential experience to use the most powerfull developers
            tools on the market. I want to make sure that the solution I prepare
            for client is the one that will make a difference and wil enrich
            your facilities.
          </p>
          <p>
            We can prognose the results and test efficancy of the methods used.
          </p>
          <div className="home__technology-group">
            <div className="home__technology-icon">
              <img className="home__icon" src="/python-icon.png" alt="" />
            </div>
            <div className="home__technology-icon">
              <img className="home__icon" src="/postgres-icon.png" alt="" />
            </div>
            <div className="home__technology-icon">
              <img className="home__icon" src="/gitlab-icon.png" alt="" />
            </div>
            <div className="home__technology-icon">
              <img className="home__icon" src="/rails-icon.png" alt="" />
            </div>
            <div className="home__technology-icon">
              <img className="home__icon" src="/react-icon.png" alt="" />
            </div>
            <div className="home__technology-icon">
              <img className="home__icon" src="/angular-icon.png" alt="" />
            </div>
            <div className="home__technology-icon">
              <img className="home__icon" src="/nodejs-icon.png" alt="" />
            </div>
            <div className="home__technology-icon">
              <img className="home__icon" src="/unity-icon.png" alt="" />
            </div>
            <div className="home__technology-icon">
              <img className="home__icon" src="/html-icon.png" alt="" />
            </div>
          </div>
        </div>
        <div className="home__clients" id="clients">
          <h3>Clients</h3>
          <h2>experience</h2>
          <img className="logo" src="/madison-sc-logo.png" alt="" />
          <div className="home__clients-carousel-wrapper">
            <div className="home__clients-carousel">
              <div className="home__clients-item">
                <img src="/top-amp.png" alt="" />
                <p>Creating such a unique and effective solution for our company, which allowed to reduce production costs thans to new software and uin such a shor time is a real challenfe and success</p>
                <img src="/bottom-amp.png" alt="" />
              </div>
              <div className="home__clients-item">
                <img src="/top-amp.png" alt="" />
                <p>I highly recommend this developer. Company websites were made with the utmost care, which translated into an increase in sales in our company.</p>
                <img src="/bottom-amp.png" alt="" />
              </div>
              <div className="home__clients-item">
                <img src="/top-amp.png" alt="" />
                <p>As a customer, I am 100% satisfied with the cooperation. A well-made website translated into an increase in customers in our travel company</p>
                <img src="/bottom-amp.png" alt="" />
              </div>
              <div className="home__clients-item">
                <img src="/top-amp.png" alt="" />
                <p>Creating such a unique and effective solution for our company, which allowed to reduce production costs thans to new software and uin such a shor time is a real challenfe and success</p>
                <img src="/bottom-amp.png" alt="" />
              </div>
            </div>
          </div>
          <button id="contact" onClick={()=>{handleFormAppears()}} className="home__contact-btn">Contact Me</button>
         
            <form className="home__form" method="POST" onSubmit={(e)=>{handleSubmit(e)}} encType={"multipart/form-data"}>
              <div
                className="home__form-close"
                onClick={() => {
                  handleFormDisappears();
                }}
              >
                <span></span>
                <span></span>
              </div>
              <h3>Contact With Me</h3>
              {isError && <div className="home__error">Enter Valid Email</div>}
              {isSend && <div className="home__send">Message Sended</div>}
              <div className="home__field">
                <label htmlFor="">Name:</label>
                <input onChange={(e)=>{handleChange(e)}} onFocus={(e)=>{handleFormLine(e)}} type="text" name="name" value={formData.name} />
              </div>
              <div  className="home__field">
                <label htmlFor="">Email:</label>
                <input onChange={(e)=>{handleChange(e)}} onFocus={(e)=>{handleFormLine(e)}} type="text" name="email" value={formData.email} />
              </div>
              <div  className="home__field">
                <label htmlFor="">Message:</label>
              <textarea onChange={(e)=>{handleChange(e)}} onFocus={(e)=>{handleFormLine(e)}} name="message" value={formData.message} id="" cols={30} rows={10}></textarea>
              </div>
              <button className="home__submit-btn" type="submit">Send</button>
            </form>
        </div>
        <div className="home__footer">
          <div className="home__col">
            <h2><div className="home__dot-top"></div>D <div className="home__dot-bottom"></div>S</h2>
            <h3>Dominik Stępień</h3>
            <h3>All rights reserved</h3>
          </div>
          <div className="home__col">
            <ul>
              <li><Link to="#portfolio">Portfolio</Link></li>
              <li><Link to="#services">Service</Link></li>
              <li><Link to="#clients">Awards</Link></li>
              <li><Link to="#technology">Technlogy</Link></li>
            </ul>
          </div>
          <div className="home__col">
            <ul>
              <li><Link to="#contact">Contact Me</Link></li>
              <li><Link to="#">Privacy</Link></li>
              <li><Link to="#">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div className="home__col">
             <i className="fa fa-facebook-square fa-3x"></i>
             <i className="fa fa-instagram fa-3x"></i>
             <i className="fa fa-linkedin-square fa-3x"></i>
             <i className="fa fa-pinterest fa-3x"></i>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
