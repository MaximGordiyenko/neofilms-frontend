import React, {useState} from 'react';
import './filmCards.scss'
import {useNavigate} from "react-router-dom";
import {Button} from "../../../components/button/Button";
import {Text} from "../../../components/text/Text";

export const HomeFilmCards = ({ img, title, date, description, movieLink, id }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = window.innerWidth <= 430;
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const navigateToDetails = () => {
        window.open(`/film-details/${id}`, '_blank');
    };
    return (
        <div className={isHovered ? "film-card hovered" : "film-card"}
             style={{ backgroundColor: isHovered ? 'var(--dark-hovered)' : 'var(--card-dark)' }}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
        >
            <div className="film-card__header">
                <Text className="light" opacity={0.5} textTransform="uppercase">{title}</Text>
                <Text className="light" opacity={0.5} textTransform="uppercase">{date}</Text>
            </div>
            <img src={img} alt={`${title} poster`} className="film-card-image" />
            {
                isHovered && !isMobile && <Button text='Details' onClick={navigateToDetails} className="film-card-details"/>
            }
            {
                isMobile && <Button text='Details' onClick={navigateToDetails} className="film-card-details"/>
            }
        </div>
    );
};

