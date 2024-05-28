import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FILM_CARDS } from '../../constants/filmsConstants';
import { CastDetHeader } from './header/DetailsHeader';
import { DetailsBody } from './body/DetailsBody';
import DetailsFooter from './castFilmFooter/DetailsFooter';
import { CustomModal } from '../../components/modal/Modal';
import { Input } from '../../components/input/Input';
import './style.css';
import closeIcon from '../../assets/images/close-cross.png';
import Icon from '../../assets/images/IMDb.png';
import { Button } from '../../components/button/Button';
import dots from '../../assets/images/thripleDots.svg';
import successImg from '../../assets/images/success.svg';
import errimg from '../../assets/images/submit-error.svg';

export const CastFilmPage = () => {
  const { path } = useParams();
  const film = FILM_CARDS.find((film) => film.path === `/${path}`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headshotFile, setHeadshotFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [headshotFileName, setHeadshotFileName] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
  });
  const headshotFileInputRef = useRef(null);
  const resumeFileInputRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setIsSubmit(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmit(false);
    setIsError(null);
    setFormData({ userName: '', userEmail: '' });
    setHeadshotFile(null);
    setResumeFile(null);
    setHeadshotFileName('');
    setResumeFileName('');
  };

  const handleHeadshotChange = (event) => {
    const file = event.target.files[0];
    setHeadshotFile(file);
    setHeadshotFileName(file.name);
  };

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    setResumeFile(file);
    setResumeFileName(file.name);
  };

  const deleteHeadshot = () => {
    setHeadshotFile(null);
    setHeadshotFileName('');
  };

  const deleteResume = () => {
    setResumeFile(null);
    setResumeFileName('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { userName, userEmail } = formData;
    if (!userName || !userEmail || !headshotFile || !resumeFile) {
      setIsError('Please fill in all fields and upload both files.');
    } else {
      setIsSubmit(true);
      setIsError(null);
    }
  };

  if (!film) {
    return <div>Film not found</div>;
  }

  const modalContent = (
    <div className="detail-content-box">
      <div className="detail-modal-title">
        <h5 className="detail-modal-header">
          Apply for the role
          {!isMobile && (
            <img className="modal-icon" src={closeIcon} onClick={closeModal} alt="Close" />
          )}
        </h5>
      </div>
      <div className="detail-modal-body">
        <Input
          label="Name"
          placeholder="Dave?"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
        />
        <Input
          label="Your Email"
          placeholder="dave@gmail.com?"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleInputChange}
        />
      </div>
      <div className="detail-modal-border" />
      <div className="detail-button-box">
        <div className="detail-upload-btn">
          <p className="modal-text">Headshot</p>
          {headshotFile ? (
            <>
              <Button text={'Delete'} onClick={deleteHeadshot} />
              <p className="modal-file-name">{headshotFileName}</p>
            </>
          ) : (
            <>
              <input
                type="file"
                ref={headshotFileInputRef}
                style={{ display: 'none' }}
                onChange={handleHeadshotChange}
              />
              <Button text="Upload" onClick={() => headshotFileInputRef.current.click()} />
              {headshotFileName && <p className="modal-text">{headshotFileName}</p>}
            </>
          )}
        </div>
        <div className="detail-upload-btn">
          <p className="modal-text">Acting resume</p>
          {resumeFile ? (
            <>
              <Button text={'Delete'} onClick={deleteResume} />
              <p className="modal-file-name">{resumeFileName}</p>
            </>
          ) : (
            <>
              <input
                type="file"
                ref={resumeFileInputRef}
                style={{ display: 'none' }}
                onChange={handleResumeChange}
              />
              <Button text="Upload" onClick={() => resumeFileInputRef.current.click()} />
              {resumeFileName && <p className="modal-text">{resumeFileName}</p>}
            </>
          )}
        </div>
      </div>
      <div className="detail-modal-border" />
      <div className="detail-form-button-box">
        <img className="modal-form-icon" src={dots} alt="dots" />
        <div className="hr-line"></div>
        <Button text={'Apply'} onClick={handleSubmit} />
        {isMobile && (
          <div onClick={closeModal} className="modal-close-button">
            Close
          </div>
        )}
      </div>
      <div className="modal-images">
        {isError && (
          <div className={'submitting-wrong'}>
            <img src={errimg} alt={'err-img'} />
            <p>Oops! Something went wrong... Please try again.</p>
          </div>
        )}
        {isSubmit && !isError && (
          <div className={'success'}>
            <img src={successImg} alt={'success-img'} />
            <p>
              All done! <br /> Your idea submitted successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <CastDetHeader />
      <DetailsBody onApplyClick={openModal} />
      <DetailsFooter />
      <CustomModal
        className="cast-content"
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Apply for Role"
        content={modalContent}
      />
    </>
  );
};
