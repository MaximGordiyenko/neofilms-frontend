import './style.scss';
import CastFilmCards from '../../../components/castFilmCard/CastFilmCard';
import Spinner from "../../../components/loader/Spinner";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCastings } from '../../../../admin_panel/store/thunk/casting.api';

export const CastFilms = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCastings());
  }, [dispatch, getCastings]);
  
  const { castings, status } = useSelector((state) => state?.casting);
  console.log({ castings, status });
  
  return (
      <div className='cast-box-wrapper'>
        {status === 'loading' ? (
          <Spinner />
        ) : (
            castings.slice(-3).map((casting, index) => {
              return(
                  <CastFilmCards
                      id={casting.id}
                      key={casting.id}
                      name={casting.title}
                      img={`/api/pages/casting/${casting?.id}/image`}
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
