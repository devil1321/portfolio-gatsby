import React,{useState, useEffect } from 'react'
import Link from 'gatsby-link'
import { SlideNode } from '../interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { gsap } from 'gsap'
import { data } from '../context/works'

const Slider:React.FC = ():JSX.Element => {
    const [currentSlides,setCurrentSlides] = useState<SlideNode[]>([])
    const [count,setCount] = useState<number>(0)
    const [animCount,setAnimCount] = useState<number>(2)
    const [movedBy,setMovedBy] = useState<number>(0)
    const [slides,setSlides] = useState<SlideNode[]>([])

    const handleCategory = (e:any):void =>{
        const navBtns = document.querySelectorAll('.slider__item')
        navBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active')
        setCurrentSlides(slides.filter(slide => slide.category === e.target.dataset.id))
        setAnimCount(0)
        setCount(0)
        setMovedBy(0)
    }
    
    const handleSliderNext = (e:any,length:number):void =>{
        const slider = document.querySelector('.slider__images')
        const img = document.querySelector('.slider__img')
        if(animCount < 2){
            setCount(count + 1)
            setAnimCount(animCount + 1)
        }else{
            setAnimCount(0)
        }
        if(count < length - 1){
            setCount(count + 1)
            setMovedBy(movedBy - img.clientWidth)
        }else if(count > length - 2){
            setCount(0)
            setMovedBy(0)
        }
      
    }
    const handleSliderPrev = (e:any,length:number):void =>{
        const slider = document.querySelector<HTMLDivElement>('.slider__images')
        const img = document.querySelector<HTMLDivElement>('.slider__img')
        console.log(count)
        if(animCount < 0){
            setAnimCount(2)
        }else{
            setAnimCount(animCount - 1)
        }
        if(count > 0){
            setCount(count - 1)
            setMovedBy(movedBy + img.clientWidth)
        }
        else if(count === 0){
            setMovedBy(img.clientWidth * (length - 1) * (-1))
            setCount(length -1)

        }
    }
    const handleSlideToIndex = (e) =>{
        const dotsNode:NodeListOf<Element> = document.querySelectorAll('.slider__dots div')
        const dots:any = [...dotsNode]
        const img = document.querySelector<HTMLDivElement>('.slider__img')
        const index = dots.indexOf(e.target)
        setCount(index)
        setMovedBy(img.clientWidth * index * (-1))
    }

    const handleSlider = (move:number):void =>{
        const slider = document.querySelector<HTMLDivElement>('.slider__images')
        slider.style.transform = `translateX(${move}px)`
    }

    const handleDots = () =>{
        const dots = document.querySelectorAll('.slider__dots div')
        dots.forEach(dot => dot.classList.remove('active'))
        dots[count].classList.add('active')
    }
    
    const handleAnimation = (frame:number):void =>{
        const articles = document.querySelectorAll('.slider__article')
        const images = document.querySelectorAll('.slider__img')
        const tl = gsap.timeline()
        
        if(frame === 0){
            tl.fromTo('.slider__article h2',{ x:500,opacity:0 },{ x:0,opacity:1,duration:1 })
                .fromTo('.slider__article h3',{ y:50,opacity:0 }, { y:0,opacity:1, duration:1 })
                .fromTo('.slider__article p',{ x:500,opacity:0 }, {x:0,opacity:1, duration:1 })
                .fromTo('.slider__article button',{ y:500,opacity:0 }, {y:0,opacity:1, duration:1 })
        }
        if(frame === 1){
            tl.fromTo('.slider__article h2',{ y:500,opacity:0 },{ y:0,opacity:1,duration:1 })
                .fromTo('.slider__article h3',{ x:50,opacity:0 }, {x:0,opacity:1, duration:1 })
                .fromTo('.slider__article p',{ y:500,opacity:0 }, {y:0,opacity:1, duration:1 })
                .fromTo('.slider__article button',{ x:500,opacity:0 }, {x:0,opacity:1, duration:1 })
        }
        if(frame === 2){
            tl.fromTo('.slider__article h2',{ x:-500,opacity:0 },{ x:0,opacity:1,duration:1 })
                .fromTo('.slider__article h3',{ x:50,opacity:0 }, {x:0,opacity:1, duration:1 })
                .fromTo('.slider__article p',{ y:500,opacity:0 }, {y:0,opacity:1, duration:1 })
                .fromTo('.slider__article button',{x:-500,opacity:0 }, {x:0,opacity:1, duration:1 })
        }
    }
    const renderArticles = () =>{
        return currentSlides.map((node:SlideNode) => {
            const { title , subtitle, text, github } = node.articles[count].node
                 return (
                     <div key={title} className="slider__article">
                         <h2>{title}</h2>
                         <h3>{subtitle}</h3>
                         <p>{text}</p>
                         <a href={github}>
                            <button><img src="/gitlab-icon.png" />See on Github</button>
                         </a>
                     </div>        
                 )
             })
        
    }
  
    const renderImages = () =>{
        return currentSlides.map(node => {
            const { link } = node.articles[count].node
            return node.slides.map((slide:string,index:number) => { 
                 return (
                     <div key={index} className="slider__img">
                         <a href={link}>
                            <img src={`/${slide}`} />
                         </a>
                     </div>
             )})
         })
    }
    const renderDots = () =>{
        return currentSlides.map(node => {
            return node.slides.map((slide) =><div onClick={(e)=>{handleSlideToIndex(e)}}></div>)    
        })
    }
      
    useEffect(()=>{
        setSlides(data)
        if(currentSlides.length === 0 && slides.length > 0){
            setCurrentSlides([slides[0]])
        }
        if(currentSlides.length > 0){
            handleDots()
        }
        handleAnimation(animCount)
        handleSlider(movedBy)
    },[slides,count,currentSlides,movedBy])

    return (
        <div className="slider">
            <div className="slider__nav">
                <ul className="slider__list">
                    <li onClick={(e)=>{handleCategory(e)}} className="slider__item active" data-id="UX/UI">UX/UI</li>
                    <li onClick={(e)=>{handleCategory(e)}} className="slider__item" data-id="Websites">Websites</li>
                    <li onClick={(e)=>{handleCategory(e)}} className="slider__item" data-id="Applications">Applications</li>
                    <li onClick={(e)=>{handleCategory(e)}} className="slider__item" data-id="E-commerce">E-commerce</li>
                </ul>
            </div>
            <div className="slider__content">
                <div className="slider__phone">
                    <div className="slider__phone-controls">
                        <div className="slider__phone-next">
                            <FontAwesomeIcon icon = {faChevronRight} onClick={(e)=>{handleSliderNext(e,currentSlides[0].slides.length)}}/>
                        </div>
                        <div>{count + 1} / {currentSlides[0]?.slides?.length}</div>
                        <div className="slider__phone-prev" onClick={(e)=>{handleSliderPrev(e,currentSlides[0].slides.length)}}>
                            <FontAwesomeIcon icon = {faChevronLeft} />
                        </div>
                    </div>
                    <div className="slider__dots">
                        {renderDots()}
                    </div>
                    <div className="slider__images-wrapper">
                        <div className="slider__images">  
                            {renderImages()}
                        </div>
                    </div>
                </div>
                <div className="slider__articles">
                   {renderArticles()}
                   <div className="slider__art-controls">
                       <div className="slider__prev" onClick={(e)=>{handleSliderPrev(e,currentSlides[0].slides.length)}}></div>
                       <div className="slider__next" onClick={(e)=>{handleSliderNext(e,currentSlides[0].slides.length)}}></div>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Slider
