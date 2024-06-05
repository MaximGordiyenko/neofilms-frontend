import React, {useEffect, useState} from 'react';
import './style.css';
import { FILM_CARDS } from '../../../constants/filmsConstants';
import { ArtistFilmCard } from '../../../components/artistCard/ArtistFilmCard';
import bodyBg from '../../../assets/images/BG-Details.jpg';
import { DetailFilmDefinition } from '../descFilm/DetailFilmDefinition';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Flex} from "../../../components/customDiv/Flex";
import {Text} from "../../../components/text/Text";

export const DetailsBody = ({ onApplyClick }) => {
  const { casting_id } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [casting, setCasting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getImage, setImage] = useState(null);

  useEffect(() => {
    if (!casting_id) {
      setError('Film not found');
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchCastingDetail = async () => {
      try {
        const [detailsResponse, imageResponse] = await axios.all([
          axios.get(`http://57.151.104.191:8888/api/pages/casting/${casting_id}`),
          axios.get(`http://57.151.104.191:8888/api/pages/casting/${casting_id}/image`, {
            responseType: 'blob'
          })
        ])
        if (isMounted) {
          setCasting(detailsResponse.data);
          const imageBlob = imageResponse.data;
          const imageUrl = URL.createObjectURL(imageBlob);
          setImage(imageUrl);
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to fetch film details or poster');
        }            }
      finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCastingDetail();
    return () => {
      isMounted = false;
    };
  }, [casting_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!casting) {
    return <p>No details available.</p>;
  }

  return (
    <div className="detail-body">
      <div className="body-film-def">
        <DetailFilmDefinition />
      </div>
      <p className={'detail-desc'}>{casting.subtitle}</p>
      <img className="body-bg" src={bodyBg} alt="" />
      <div className="cards-wrapper">
        <div className="detail-cards">
          <ArtistFilmCard
            actor_name={casting.roles[0].name}
            key={casting.id}
            bio={casting.roles[0].description}
            onApplyClick={onApplyClick}
          />
        </div>
      </div>
    </div>
  );
};
