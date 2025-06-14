import React, {useEffect, useState} from 'react';
import './style.css';
import { ArtistFilmCard } from '../../../components/artistCard/ArtistFilmCard';
import bodyBg from '../../../assets/images/BG-Details.jpg';
import { DetailFilmDefinition } from '../descFilm/DetailFilmDefinition';
import {useParams} from "react-router-dom";
import axios from "axios";
import {getCasting, getImage} from "../../../../api/casting";

export const DetailsBody = ({ onApplyClick }) => {
  const { casting_id } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [casting, setCasting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getCastImage, setImage] = useState(null);

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
          getCasting(casting_id),
          getImage(casting_id)
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
        }
      } finally {
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

  const handleApplyClick = (roleName) => {
    onApplyClick(roleName);
  };

  return (
    <div className="detail-body">
      <div className="body-film-def">
        <DetailFilmDefinition/>
      </div>
      <img className="body-bg" src={bodyBg} alt=""/>
      <p className={'detail-desc'}>{casting.plot}</p>
      <div className="cards-wrapper">
        <div className="detail-cards">
          {casting.roles.map((role, index) => (
            <ArtistFilmCard
              index={index}
              actor_name={role.name}
              key={role.id}
              bio={role.description}
              onApplyClick={() => handleApplyClick(role.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
