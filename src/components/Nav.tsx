import React,{useState,useEffect} from 'react'
import Link from 'gatsby-link'
import { gsap  } from 'gsap/all'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'



const Nav:React.FC = (): JSX.Element => {
    const [isOpen,setIsOpen] = useState<boolean>(false)


const handleNav = ():void =>{
    const itemsNode:any = document.querySelectorAll('.nav__item')
    const listNode:any = document.querySelector<HTMLUListElement>('.nav__list')
    if(!isOpen){
        listNode.style.height = `100%`
        gsap.fromTo([...itemsNode],
            {
            y:-150
        },{
            y:0,
            stagger: 0.2
        })
    }else{
        listNode.style.height = `${0}px`
        gsap.fromTo([...itemsNode],
            {
            y:0
        },{
            y:-150,
            stagger: 0.2
        })
    }
    
}


    return (
        <div className="nav">
            <div className="nav__btn" onClick={()=>{
                setIsOpen(!isOpen)
                handleNav()
                }}>
                <h3>Menu</h3>
                {isOpen
                ? <FontAwesomeIcon icon={faChevronUp} />
                : <FontAwesomeIcon icon={faChevronDown} />}
            </div>
            <ul className="nav__list">
                <li className="nav__item">
                    <Link to="#portfolio" >Portfolio</Link>
                </li>
                <li className="nav__item">
                    <Link to="#services" >Service</Link>
                </li>
                <li className="nav__item">
                    <Link to="#clients" >Awards</Link>
                </li>
                <li className="nav__item">
                    <Link to="#technology" >Technology</Link>
                </li>
                <li className="nav__item">
                    <Link to="#contact" >Contact Me</Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav
