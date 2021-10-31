import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { ServiceProps } from '../interfaces'

const Service:React.FC<ServiceProps> = ({id,icon,number,title,text,handleService}) => {
    return (
        <div onClick={(e:any)=>{handleService(id)}} className="service">
            <div className="service__introduction">
                <img src={icon} alt="icon" />
                <div className="service__text">
                    <h4>{number}</h4>
                    <h2>{title}</h2>
                    <p>{text}</p>
                </div>
            </div>
           
        </div>
    )
}

export default Service
