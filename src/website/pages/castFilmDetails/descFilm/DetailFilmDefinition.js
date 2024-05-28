import { FILM_CARDS } from '../../../constants/filmsConstants';
import './style.css';
export const DetailFilmDefinition = () => {
  const firstFilmCard = FILM_CARDS[0];
  return (
    <div className="detail-definition-container">
      <p className="production-info">{firstFilmCard.production}</p>
      <div className="info-box">
        <div className={'details-box'}>
          <div className="info-div">
            <h5>Producer</h5>
            <div className="info">{firstFilmCard.producer}</div>
          </div>
          <div className="info-div">
            <h5>Director</h5>
            <div className="info">{firstFilmCard.director}</div>
          </div>
          <div className="info-div">
            <h5>Writer</h5>
            <div className="info">{firstFilmCard.director}</div>
          </div>
          <div className="info-div">
            <h5>Casting Director</h5>
            <div className="info">{firstFilmCard.director}</div>
          </div>
        </div>
        <div className="data-box">
          <div className="info-div">
            <h5>Audition dates</h5>
            <div className="info">{firstFilmCard.audition_dates}</div>
          </div>
          <div className="info-div">
            <h5>Callback Dates</h5>
            <div className="info">{firstFilmCard.director}</div>
          </div>
          <div className="info-div">
            <h5>Shoot Dates</h5>
            <div className="info">{firstFilmCard.director}</div>
          </div>
          <div className="info-div">
            <h5>Deadline</h5>
            <div className="info">{firstFilmCard.director}</div>
          </div>
        </div>
        <div className="rate-box">
          <div className="info-div">
            <h5>Rate of Pay</h5>
            <div className="info">{firstFilmCard.rates}</div>
          </div>
          <div className="info-div">
            <h5>Location</h5>
            <div className="info">Los Angeles, CA</div>
          </div>
        </div>
      </div>
    </div>
  );
};
