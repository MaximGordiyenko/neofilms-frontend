import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CastDetHeader } from './header/DetailsHeader';
import { DetailsBody } from './body/DetailsBody';
import { CustomModal } from '../../components/modal/Modal';
import './style.css';
import closeIcon from '../../assets/images/cross.svg';
import { Button } from '../../components/button/Button';
import dots from '../../assets/images/thripleDots.svg';
import successImg from '../../assets/images/success.svg';
import errimg from '../../assets/images/submit-error.svg';
import { getCasting, sendResume } from "../../../api/casting";
import { FooterCreds } from "../../components/credsFooter/FooterCreds";
import { Flex } from "../../components/customDiv/Flex";
import { ClipInput } from "../../components/input/ClipInput";

export const CastFilmPage = () => {
  const { casting_id } = useParams();
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
  const [roleName, setRoleName] = useState('');
  const headshotFileInputRef = useRef(null);
  const resumeFileInputRef = useRef(null);

  const [castingData, setCastingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCastingDetails = async () => {
      try {
        setLoading(true);
        const response = await getCasting(casting_id);
        setCastingData(response.data);
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

  const trimFileName = (fileName, maxLength) => {
    if (!fileName) return '';

    const dotIndex = fileName.lastIndexOf('.');

    if (dotIndex === -1 || fileName.length <= maxLength) {
      return fileName;
    }

    const namePart = fileName.substring(0, dotIndex);
    const extension = fileName.substring(dotIndex);

    return `${namePart.substring(0, maxLength)}...${extension}`;
  };
  const trimmedHeadshotFileName = trimFileName(headshotFileName, 10);
  const trimmedResumeFileName = trimFileName(resumeFileName, 10);
  const openModal = (roleName) => {
    setRoleName(roleName);
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
      role: roleName,
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

  if (!casting_id) {
    return <div>Film not found</div>;
  }

  const modalContent = (
    <div className="detail-content-box">
      <Flex className="detail-modal-title" flexDirection="row" justifyContent='center' alignItems="center">
        <h5 className="detail-modal-header">
          Apply for the role
        </h5>
        {!isMobile && (
          <img className="modal-icon" src={closeIcon} onClick={closeModal} alt="Close" />
        )}
      </Flex>
      <div className="detail-body-box">
        <Flex
          justifyContent="space-between"
          className="user-creds"
          flexDirection={isMobile ? 'column' : 'row'}
        >
          <ClipInput
            label="Name"
            placeholder="Dave?"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
          />
          <ClipInput
            label="Your Email"
            placeholder="dave@gmail.com?"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleInputChange}
          />
        </Flex>
        <Flex className="detail-button-box" justifyContent="space-between">
          <div className="detail-upload-btn">
            <Flex flexDirection="column">
              <p className="modal-text">Headshot</p>
              {headshotFile && <p className="modal-file-name">{trimmedHeadshotFileName}</p>}
            </Flex>
            {headshotFile ? (
              <Button text={'Delete'} onClick={deleteHeadshot} />
            ) : (
              <>
                <input
                  type="file"
                  ref={headshotFileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleHeadshotChange}
                />
                <Button text="Upload" onClick={() => headshotFileInputRef.current.click()} />
                {headshotFileName && <p className="modal-text">{trimmedHeadshotFileName}</p>}
              </>
            )}
          </div>
          <Flex className="detail-upload-btn" alignItems="center" justifyContent="space-between">
            <Flex flexDirection="column">
              <p className="modal-text">Acting resume</p>
              {resumeFile && <p className="modal-file-name">{trimmedResumeFileName}</p>}
            </Flex>
            {resumeFile ? (
              <Button text={'Delete'} onClick={deleteResume} />
            ) : (
              <>
                <input
                  type="file"
                  ref={resumeFileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleResumeChange}
                />
                <Button text="Upload" onClick={() => resumeFileInputRef.current.click()} />
                {resumeFileName && <p className="modal-text">{trimmedResumeFileName}</p>}
              </>
            )}
          </Flex>
        </Flex>
        <div className="detail-form-button-box">
          <img className="modal-form-icon" src={dots} alt="dots" />
          <div className="hr-line" />
          <Button text={'Apply'} onClick={handleSubmit}/>
          {isMobile && (
            <div onClick={closeModal} className="modal-close-button">
              Cancel
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
                All done! <br /> Your application was submitted successfully!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className='details-cast-wrapper'>
      <CastDetHeader />
      <DetailsBody onApplyClick={openModal} />
      <CustomModal
        className="cast-content"
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Apply for Role"
        content={modalContent}
      />
      <FooterCreds />
    </div>
  );
};
