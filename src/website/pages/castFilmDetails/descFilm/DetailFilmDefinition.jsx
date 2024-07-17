import { FILM_CARDS } from '../../../constants/filmsConstants';
import './style.css';
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {getCasting} from "../../../../api/casting";
export const DetailFilmDefinition = () => {
  const { casting_id } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [casting, setCasting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          getCasting(casting_id)
        ])
        if (isMounted) {
          setCasting(detailsResponse.data);
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

  if (!casting_id) {
    return <p>No details definition available.</p>;
  }

  const formatDate = (milliseconds) => {
    if (!milliseconds) return null;
    const date = new Date(milliseconds);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  };

  const renderDateRange = (from, to) => {
    if (!from && !to) return "N/A";
    return `${formatDate(from) || "N/A"} to ${formatDate(to) || "N/A"}`;
  };
  return (
    <div className="detail-definition-container">
      <p className="production-info">{casting.subtitle}</p>
      <div className="info-box">
        <div className={'details-box'}>
          <div className="info-div">
            <h5>Producer</h5>
            <div className="info">{casting.producer}</div>
          </div>
          <div className="info-div">
            <h5>Director</h5>
            <div className="info">{casting.casting_director}</div>
          </div>
          <div className="info-div">
            <h5>Writer</h5>
            <div className="info">{casting.writer}</div>
          </div>
          {/*<div className="info-div">*/}
          {/*  <h5>Casting Director</h5>*/}
          {/*  <div className="info">{firstFilmCard.director}</div>*/}
          {/*</div>*/}
        </div>
        <div className="data-box">
          <div className="info-div">
            <h5>Audition dates</h5>
            <div className="info">
              <div className="info">{renderDateRange(casting.audition_dates.from, casting.audition_dates.to)}</div>
            </div>
          </div>
          <div className="info-div">
            <h5>Callback Dates</h5>
            <div className="info">
              <div className="info">{renderDateRange(casting.callback_dates.from, casting.callback_dates.to)}</div>
            </div>
          </div>
          <div className="info-div">
            <h5>Shoot Dates</h5>
            <div className="info">
              <div className="info">{renderDateRange(casting.shoot_dates.from, casting.shoot_dates.to)}</div>
            </div>
          </div>
          <div className="info-div">
            <h5>Deadline</h5>
            <div className="info">{formatDate(casting.deadline) || "N/A"}</div>
          </div>
        </div>
        <div className="rate-box">
          <div className="info-div">
            <h5>Rate of Pay</h5>
            <div className="info">${casting.rate_of_pay_per_day}/day</div>
          </div>
          <div className="info-div">
            <h5>Location</h5>
            <div className="info">{casting.location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
