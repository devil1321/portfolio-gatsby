import React,{useState, useEffect } from 'react'
import { SlideNode, ArticleNode} from '../interfaces'
import { gsap } from 'gsap'


const Slider:React.FC = ():JSX.Element => {
    const [currentSlides,setCurrentSlides] = useState<SlideNode[]>([])
    const [count,setCount] = useState<number>(0)
    const [animCount,setAnimCount] = useState<number>(2)
    const [movedBy,setMovedBy] = useState<number>(0)
    const [slides,setSlides] = useState<SlideNode[]>([
        {
            category:'UX/UI',
            slides:['e-commerce/sale-hub.png','applications/quiz-app.png','applications/todo-app-redux.png'],
            articles:[
                {
                    node:{
                        title:'Sale Hub',
                        subtitle:'React/Redux/TypeScript/SCSS',
                        text:'This is a faithful and refreshed version of themeforest store template'
                    },
                },
                {
                    node:{
                        title:'Quiz-App',
                        subtitle:'React/SCSS',
                        text:'Simple draggable and checkable quiz app'
                    },
                },
                {
                    node:{
                        title:'Todo App Dates',
                        subtitle:'React/Redux/SCSS',
                        text:'Simple Todo List with dates and modify feature'
                    }
                }
            ]
        },
        {
            category:'Websites',
            slides:['websites/free-landing-page.png','websites/club-in.png','websites/easy-bank.png','websites/ice-and-cake.png','websites/manage-landing-page.png','websites/loopstudios.png','websites/apps-market.png','websites/rooms-homepage.png',],
            articles:[
                {
                    node:{
                        title:'Free Landing Page',
                        subtitle:'HTML/CSS/SCSS/JS/SVG/GSAP',
                        text:'Free Landing Page site with animated SVG and gsap scroll trigger feature.'
                    }
               
                },
                {
                    node:{
                        title:'Club In',
                        subtitle:'HTML/CSS/SCSS/JS/XD',
                        text:'Club In Landing Page with carousels'
                    }
               
                },
                {
                    node:{
                        title:'Easy Bank',
                        subtitle:'HTML/CSS/SCSS/JS',
                        text:'Easy Bank landing page from freeCodeCamp'
                    }
               
                },
                {
                    node:{
                        title:'Ice And Cake',
                        subtitle:'HTML/CSS/SCSS/JS/XD',
                        text:'Ice and Cake copy of a page from an Adobe XD template'
                    }
               
                },
                {
                    node:{
                        title:'Manage Landing Page',
                        subtitle:'HTML/CSS/SCSS/JS',
                        text:'Manage Landing Page from FrontEndMentor'
                    }
               
                },
                {
                    node:{
                        title:'LoopStudios',
                        subtitle:'HTML/CSS/SCSS/JS',
                        text:'Loop Studios Landing Page from FrontEndMentor'
                    }
               
                },
                {
                    node:{
                        title:'Apps Market',
                        subtitle:'HTML/CSS/SCSS/JS/XD',
                        text:'Apps Market Landing Page from Adobbe XD'
                    }
               
                },
                {
                    node:{
                        title:'Room Homepage',
                        subtitle:'HTML/CSS/SCSS/JS',
                        text:'Simple Room Home Page Landing Page'
                    }
               
                }
            ]
        },
        {
            category:'Applications',
            slides:['applications/wheather-app.png','applications/quiz-app.png','applications/todo-app-redux.png','applications/todo-draggable.png','applications/static-job-listing.png'],
            articles:[
                {
                    node:{
                        title:'Wheather App',
                        subtitle:'React/Redux/SCSS',
                        text:'My Wheather App builded on OpenWheather API'
                    }
               
                },
                {
                    node:{
                        title:'Quiz-App',
                        subtitle:'React/SCSS',
                        text:'Simple draggable and checkable quiz app'
                    }
               
                },
                {
                    node:{
                        title:'Todo App Dates',
                        subtitle:'React/Redux/SCSS',
                        text:'My simple todo app with option to modify and describes to do items'
                    }
               
                },
                {
                    node:{
                        title:'Todo App Draggable',
                        subtitle:'React/SCSS',
                        text:'Simple Todo List with draggable feature'
                    }
               
                },
                {
                    node:{
                        title:'Static Job Listing',
                        subtitle:'React/SCSS',
                        text:'This is simple site with feature filtering jobs by badges'
                    }
               
                }
            ]
        },
        {
            category:'E-commerce',
            slides:['e-commerce/sale-hub.png','e-commerce/easy-shop.png'],
            articles:[
                {
                    node:{
                        title:'Sale Hub',
                        subtitle:'React/Redux/TypeScript/SCSS',
                        text:'This is a faithful and refreshed version of themeforest store template'
                    }
               
                },
                {
                    node:{
                        title:'Easy Shop',
                        subtitle:'React/SCSS',
                        text:'This is a simple shop builded with React'
                    }
               
                }
            ]
        },

    ])

    const handleCategory = (e:any):void =>{
        const navBtns = document.querySelectorAll('.slider__item')
        navBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active')
        setCurrentSlides(slides.filter(slide => slide.category === e.target.dataset.id))
    }
    
    const handleSliderNext = (slides:string[]):void =>{
        const slider = document.querySelector('.slider__images')
        const img = document.querySelector('.slider__img')
        if(animCount < 2){
            setCount(count + 1)
            setAnimCount(animCount + 1)
        }else{
            setAnimCount(0)
        }
        if(count < slides.length - 1){
            setCount(count + 1)
        }else{
            setCount(0)
        }
        if(movedBy >= -slider.clientWidth){
            setMovedBy(movedBy + img.clientWidth * (-1))
        }else{
            setMovedBy(0)
        }
    }
    const handleSliderPrev = ():void =>{
        const slider = document.querySelector<HTMLDivElement>('.slider__images')
        const img = document.querySelector<HTMLDivElement>('.slider__img')
        if(animCount < 0){
            setCount(2)
            setAnimCount(2)
        }else{
            setAnimCount(animCount - 1)
        }
        if(count > 0){
            setCount(count - 1)
        }else{
            setCount(2)
        }
        if(movedBy < 0){
            setMovedBy(movedBy + img.clientWidth)
        }else {
            setMovedBy(img.clientWidth * (-3))
        }
    }

    const handleSlider = (move:number):void =>{
        const slider = document.querySelector<HTMLDivElement>('.slider__images')
        slider.style.transform = `translateX(${move}px)`
    }

    
    const handleAnimation = (frame:number):void =>{
        const articles = document.querySelectorAll('.slider__article')
        const images = document.querySelectorAll('.slider__img')
        const tl = gsap.timeline()
        
        if(frame === 0){
            tl.fromTo('.slider__article h2',{ x:500,opacity:0 },{ x:0,opacity:1,duration:1 })
                .fromTo('.slider__article h3',{ y:50,opacity:0 }, { y:0,opacity:1, duration:1 })
                .fromTo('.slider__article p',{ x:500,opacity:0 }, {x:0,opacity:1, duration:1 })
        }
        if(frame === 1){
            tl.fromTo('.slider__article h2',{ y:500,opacity:0 },{ y:0,opacity:1,duration:1 })
                .fromTo('.slider__article h3',{ x:50,opacity:0 }, {x:0,opacity:1, duration:1 })
                .fromTo('.slider__article p',{ y:500,opacity:0 }, {y:0,opacity:1, duration:1 })
        }
        if(frame === 2){
            tl.fromTo('.slider__article h2',{ x:-500,opacity:0 },{ x:0,opacity:1,duration:1 })
                .fromTo('.slider__article h3',{ x:50,opacity:0 }, {x:0,opacity:1, duration:1 })
                .fromTo('.slider__article p',{ y:500,opacity:0 }, {y:0,opacity:1, duration:1 })
        }
    }
    const renderArticles = () =>{
        return currentSlides.map(node => {
            const { title , subtitle, text } = node.articles[count].node  
                 return (
                     <div className="slider__article">
                         <h2>{title}</h2>
                         <h3>{subtitle}</h3>
                         <p>{text}</p>
                     </div>        
                 )
             })
        
    }
  
    const renderImages = () =>{
        return currentSlides.map(node => {
            return node.slides.map(slide => { 
                 return (
                     <div className="slider__img">
                         <img src={`/${slide}`} />
                     </div>
             )})
         })
    }

    useEffect(()=>{
        if(currentSlides.length === 0){
            setCurrentSlides([slides[0]])
        }
        handleAnimation(animCount)
        handleSlider(movedBy)
        console.log(movedBy)
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
                    <div className="slider__images-wrapper">
                        <div className="slider__images">
                            {renderImages()}
                        </div>
                    </div>
                </div>
                <div className="slider__articles">
                   {renderArticles()}
                   <div className="slider__art-controls">
                       <div className="slider__prev" onClick={()=>{handleSliderPrev()}}></div>
                       <div className="slider__next" onClick={()=>{handleSliderNext(currentSlides[0].slides)}}></div>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Slider
