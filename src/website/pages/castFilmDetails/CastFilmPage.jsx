import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CastDetHeader } from './header/DetailsHeader';
import { DetailsBody } from './body/DetailsBody';
import { CustomModal } from '../../components/modal/Modal';
import { Input } from '../../components/input/Input';
import './style.css';
import closeIcon from '../../assets/images/xmarkmodal.png';
import Icon from '../../assets/images/IMDb.png';
import { Button } from '../../components/button/Button';
import dots from '../../assets/images/thripleDots.svg';
import successImg from '../../assets/images/success.svg';
import errimg from '../../assets/images/submit-error.svg';
import axios from "axios";
import {FooterCreds} from "../../components/credsFooter/FooterCreds";
import {Flex} from "../../components/customDiv/Flex";

export const CastFilmPage = () => {
  const { casting_id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(true);
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

  const [castingData, setCastingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCastingDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://57.151.104.191:8888/api/pages/casting/${casting_id}`);
        setCastingData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching casting details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCastingDetails();
  }, [casting_id]);

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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
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
  async function sendResume(castingId, _formData) {
    const formData = new FormData();
    for (const key in _formData) {
      formData.append(key, _formData[key]);
    }

    return await axios.post(`http://57.151.104.191:8888/api/pages/casting/${castingId}/send-resume`, formData, {
      withCredentials: true,
    });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(null);
    if (!validateEmail(formData.userEmail)) {
      setIsError('Please enter a valid email address.');
      return;
    }
    const data = {
      name: formData.userName,
      email: formData.userEmail,
      acting_resume: resumeFile,
      role: 'test'
    };
    try {
      const response = await sendResume(casting_id, data);
      console.log(response.data);
      setIsModalOpen(false);
      setIsSubmit(true);
    } catch (error) {
      console.error(error);
      setIsError('An error occurred while submitting the form.');
    } finally {
      setIsSubmit(false);
    }
  };

  console.log(isError)
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const { userName, userEmail } = formData;
  //   if (!userName || !userEmail || !headshotFile || !resumeFile) {
  //     setIsError('Please fill in all fields and upload both files.');
  //   } else {
  //     setIsSubmit(true);
  //     setIsError(null);
  //   }
  // };

  if (!casting_id) {
    return <div>Film not found</div>;
  }

  const modalContent = (
    <div className="detail-content-box">
      <Flex className="detail-modal-title" flexDirection="row" justifyContent="space-between">
        <h5 className="detail-modal-header">
          Apply for the role
        </h5>
        {!isMobile && (
          <img className="modal-icon" src={closeIcon} onClick={closeModal} alt="Close" />
        )}
      </Flex>
      <Flex className="detail-body-box" flexDirection="column">
        <Flex justifyContent="space-between" className="user-creds">
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
        </Flex>
        <Flex className="detail-button-box"  justifyContent="space-between">
          <div className="detail-upload-btn">
            <Flex flexDirection="column">
              <p className="modal-text">Headshot</p>
              <p className="modal-file-name">{headshotFileName}</p>
            </Flex>
            {headshotFile ? (
              <Button text={'Delete'} onClick={deleteHeadshot}/>
            ) : (
              <>
                <input
                  type="file"
                  ref={headshotFileInputRef}
                  style={{display: 'none'}}
                  onChange={handleHeadshotChange}
                />
                <Button text="Upload" onClick={() => headshotFileInputRef.current.click()}/>
                {headshotFileName && <p className="modal-text">{headshotFileName}</p>}
              </>
            )}
          </div>
          <Flex className="detail-upload-btn" alignItems="center">
            <Flex flexDirection="column">
              <p className="modal-text">Acting resume</p>
              <p className="modal-file-name">{resumeFileName.substring(0,15)}</p>
            </Flex>
            {resumeFile ? (
              <>
                <Button text={'Delete'} onClick={deleteResume}/>
              </>
            ) : (
              <>
                <input
                  type="file"
                  ref={resumeFileInputRef}
                  style={{display: 'none'}}
                  onChange={handleResumeChange}
                />
                <Button text="Upload" onClick={() => resumeFileInputRef.current.click()}/>
                {resumeFileName && <p className="modal-text">{resumeFileName}</p>}
              </>
            )}
          </Flex>
        </Flex>
        <div className="detail-form-button-box">
          <img className="modal-form-icon" src={dots} alt="dots"/>
          <div className="hr-line"/>
          <Button text={'Apply'} onClick={handleSubmit}/>
          {isMobile && (
            <div onClick={closeModal} className="modal-close-button">
              Close
            </div>
          )}
        </div>
        <div className="modal-images">
          {isError && (
            <div className={'submitting-wrong'}>
              <img src={errimg} alt={'err-img'}/>
              <p>Oops! Something went wrong... Please try again.</p>
            </div>
          )}
          {isSubmit && !isError && (
            <div className={'success'}>
              <img src={successImg} alt={'success-img'}/>
              <p>
                All done! <br/> Your idea submitted successfully!
              </p>
            </div>
          )}
        </div>
      </Flex>
    </div>
  );

  return (
    <div className='details-cast-wrapper'>
      <CastDetHeader/>
      <DetailsBody onApplyClick={openModal}/>
      <CustomModal
        className="cast-content"
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Apply for Role"
        content={modalContent}
      />
      <FooterCreds/>
    </div>
  );
};
