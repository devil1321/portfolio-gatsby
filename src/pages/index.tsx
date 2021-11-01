import * as React from "react";
import { useState, useEffect } from "react";
/*-----------------COMPONENTS---------------------*/
import Layout from "../components/layout";
import { data } from "../context/works";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "gatsby-link";
import Seo from "../components/seo";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import Service from "../components/Service";

const IndexPage: React.FC = (): JSX.Element => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const [current, setCurrent] = useState<any[]>([]);
  const [isContent, setIsContent] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [move,setMove] = useState<number>(0)

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

    if (id === "UX/UI" || id === "E-commerce") height = 150;
    else if (id === "Websites") {
      height = 470;
    } else if (id === "Applications") {
      height = 310;
    }

    setCurrent(category.slides);
    setTimeout(() => {
      setIsContent(true);
    }, 500);

    let tl = gsap.timeline();
    tl.fromTo(
      ".home__service-content",
      { width: "0px", height: "10px" },
      { width: "100%", height: "10px", duration: 1 }
    ).fromTo(
      ".home__service-content",
      { height: "2px", padding: "0px" },
      { height: `${height}px`, padding: "20px", duration: 1, delay: 0.4 }
    );
  };

  const handleServiceClose = (): void => {
    var height: number;
    if (category === "UX/UI" || category === "E-commerce") height = 150;
    else if (category === "Websites") {
      height = 470;
    } else if (category === "Applications") {
      height = 310;
    }
    let tl = gsap.timeline();
    tl.fromTo(
      ".home__service-content",
      { height: `${height}`, padding: "20px" },
      { height: `10px`, padding: "0px", duration: 1 }
    ).fromTo(
      ".home__service-content",
      { width: "100%", height: "10px" },
      { width: "0px", height: "0px", duration: 1 }
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
          scrollTrigger: {
            trigger: "#projects",
            start: "-300px",
            end: "-200px",
            scrub: 6,
          },
        }
      );
  };


  useEffect(() => {
    handleService();
    handleProjects();
  }, []);
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
          {isContent && (
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
          )}
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
          <img src="/madison-sc-logo.png" alt="" />
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
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
