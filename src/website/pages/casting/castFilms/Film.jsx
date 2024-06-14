import './style.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CastFilmCards from '../../../components/castFilmCard/CastFilmCard';

export const CastFilms = () => {
  const [castings, setCastings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCastings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://57.151.104.191:8888/api/pages/castings');
        const castingsData = response.data;

        const castingsWithImages = await Promise.all(castingsData.map(async (casting) => {
          const imageResponse = await axios.get(`http://57.151.104.191:8888/api/pages/casting/${casting.id}/image`, { responseType: 'blob' });
          const imageUrl = URL.createObjectURL(imageResponse.data);
          return { ...casting, imageUrl };
        }));

        setCastings(castingsWithImages);
      } catch (error) {
        console.error('Error fetching castings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCastings();
  }, []);

  console.log(castings, 'castings')

  return (
      <div className={'cast-box-wrapper'}>
        {loading ? (
            <p>Loading...</p>
        ) : (
            castings.slice(0,3).map((casting, index) => {
              console.log(casting, 'cast')
              return(
                  <CastFilmCards
                      id={casting.id}
                      key={index}
                      name={casting.title}
                      img={casting.imageUrl}
                      roles={casting.roles.length}
                      movieDes={casting.additional_info}
                  />
              )
          })
          )
        }
      </div>
  );
};
