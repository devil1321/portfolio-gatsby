import React from 'react'
import Nav from './Nav'
import { StaticImage } from "gatsby-plugin-image"
import { graphql,useStaticQuery } from 'gatsby'

interface ImageSharp{
    imageSharp:{
        fluid:{
            src:string
        }
    }
  }

const Hero:React.FC = (): JSX.Element  => {
    return (
        <div className="hero">
            <div className="hero__background">
                <img src="/hero.png" alt="" />
            </div>
            <div className="hero__info">
                <h1><div className="hero__dot-top"></div>D <div className="hero__dot-bottom"></div>S</h1>
                <p>Dominik Stepien</p>
                <p>Front End Developer</p>
            </div>
            <Nav />
            <div className="hero__feature">
                <h2>Engage Design Evolve</h2>
            </div>
        </div>
    )
}


export default Hero
