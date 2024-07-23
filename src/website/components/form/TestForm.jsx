import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import dots from '../../assets/images/thripleDots.svg';
import CustomDropdown from '../dropdown/CustomDropdown';
import clipleft from '../../assets/images/clipleft.svg';
import clipright from '../../assets/images/clipright.svg';
import emailjs from '@emailjs/browser';
import bgBorder from '../../assets/images/buttonSvg.svg';
import successImg from '../../assets/images/success.svg';

const Form = () => {
  const [userName, setUserName] = useState({ value: '', error: '' });
  const [userDiscord, setUserDiscord] = useState({ value: '', error: '' });
  const [userBestMovie, setUserBestMovie] = useState({ value: '', error: '' });
  const [selectedBudget, setSelectedBudget] = useState('50-100k');
  const [userConcept, setUserConcept] = useState({ value: '', error: '' });
  const [isBtnPressed, setIsBtnPressed] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [showSuccessSneaker, setShowSuccessSneaker] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isSubmit && isBtnPressed && isFilled) {
      setShowSuccessSneaker(true);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setShowSuccessSneaker(false);
          setFadeOut(false);
        }, 1000);
      }, 2000);
    }
  }, [isSubmit, isBtnPressed, isFilled]);

  const form = useRef();

  const options = [
    { value: '50-100k', label: '50-100k' },
    { value: '150-250k', label: '150-250k' },
    { value: '250-500k', label: '250-500k' },
    { value: '500+k', label: '500+k' },
  ];

  const handleBtnPressed = () => {
    setIsBtnPressed(true);
  };

  console.log(selectedBudget, 'value');

  const handleSubmit = (e) => {
    e.preventDefault();
    let isError = false;
    const userCredentials = {
      username: userName.value,
      discordName: userDiscord.value,
      userMovie: userBestMovie.value,
      concept: userConcept.value,
      budget: selectedBudget,
    };
    if (!userCredentials.username) {
      setUserName({ value: '', error: 'Name is required' });
      isError = true;
    }
    if (!userCredentials.discordName) {
      setUserDiscord({ value: '', error: 'Please, enter a discord' });
      isError = true;
    }
    if (!userCredentials.userMovie) {
      setUserBestMovie({ value: '', error: 'Tell us your favourite movie' });
      isError = true;
    }
    if (!userCredentials.concept) {
      setUserConcept({ value: '', error: 'Please, concept need' });
      isError = true;
    }
    if (!userCredentials.budget) {
      setSelectedBudget(null);
      isError = true;
    }
    if (!isError) {
      setUserName({ value: '', error: '' });
      setUserDiscord({ value: '', error: '' });
      setUserBestMovie({ value: '', error: '' });
      setUserConcept({ value: '', error: '' });
      setSelectedBudget(selectedBudget);
      try {
        emailjs
          .sendForm('service_yfracbb', 'template_hjypvh8', form.current, 'Z9T9c4TGtpcAEIrXq')
          .then((result) => {
            console.log(result.text);
            setIsSubmit(true);
          });
      } catch (err) {
        console.error(err);
        setIsSubmit(false);
      }
    }
  };

  const handleChangeName = (e) => {
    setUserName({ value: e.target.value, error: '' });
    setIsFilled(true);
  };
  const handleChangeDiscord = (e) => {
    setUserDiscord({ value: e.target.value, error: '' });
    setIsFilled(true);
  };
  const handleChangeMovie = (e) => {
    setUserBestMovie({ value: e.target.value, error: '' });
    setIsFilled(true);
  };
  const handleChangeConcept = (e) => {
    setUserConcept({ value: e.target.value, error: '' });
    setIsFilled(true);
  };
  const handleDropdownChange = (selectedValue) => {
    setSelectedBudget(selectedValue);
  };
  return (
    <form className="form-container" ref={form} onSubmit={handleSubmit}>
      <div className={'inputs-container'}>
        <div className={'name-box'}>
          <label htmlFor="user_name">How should we call you?</label>
          <div className={'custom-input-box'}>
            <img src={clipleft} alt={'inp-clip-l'} />
            <input
              type="text"
              placeholder={'Dave?'}
              id="input1"
              name="user_name"
              value={userName.value}
              onChange={handleChangeName}
            />
            <img src={clipright} alt={'inp-clip-r'} />
          </div>
          {userName.error && <span className="error-message">{userName.error}</span>}
        </div>
        <div className={'discord-address'}>
          <label htmlFor="input2">Your Discord?</label>
          <div className={'custom-input-box'}>
            <img src={clipleft} alt={'inp-clip-l'} />
            <input
              placeholder={'@davethecreator'}
              type="text"
              id="input2"
              name="discord_name"
              value={userDiscord.value}
              onChange={handleChangeDiscord}
            />
            <img src={clipright} alt={'inp-clip-r'} />
          </div>
          {userDiscord.error && <span className="error-message">{userDiscord.error}</span>}
        </div>
        <div className={'project-name'}>
          <label htmlFor="best_movie">Project name</label>
          <div className={'custom-input-box'}>
            <img src={clipleft} alt={'inp-clip-l'} />
            <input
              placeholder={'[The best movie]'}
              type="text"
              id="input3"
              name="best_movie"
              onChange={handleChangeMovie}
              value={userBestMovie.value}
            />
            <img src={clipright} alt={'inp-clip-r'} />
          </div>
          {userBestMovie.error && <span className="error-message">{userBestMovie.error}</span>}
        </div>
        <div className={'budget-box'}>
          <label htmlFor={'custom-dropdown'}>Budget</label>
          <div className={'btn-wrapper'}>
            <img src={clipleft} alt={'inp-clip-l'} />
            <CustomDropdown
              name="budget"
              options={options}
              value={selectedBudget}
              onChange={handleDropdownChange}
            />
            <img src={clipright} alt={'inp-clip-r'} />
          </div>
        </div>
      </div>
      <label htmlFor="textarea" className={'textarea-label'}>
        Your concept
      </label>
      <textarea
        className={'textarea-form'}
        placeholder={'It all starts far far away...'}
        id="textarea"
        name="concept"
        value={userConcept.value}
        onChange={handleChangeConcept}
      ></textarea>
      {userConcept.error && <span className="error-message">{userConcept.error}</span>}
      <div className={'button-form-box'}>
        <img src={dots} alt={'dots-form'} className={'dots-form'} />
        <div className={'hr-line-form'} />
        <button
          type="submit"
          className={'submit-btn'}
          onClick={handleBtnPressed}
          disabled={!isFilled}
        >
          <img src={bgBorder} alt={'bg-form-btn-border'} className='background-btn-form' />
          <span>submit</span>
        </button>
      </div>
      {showSuccessSneaker && (
        <div className={`success ${fadeOut ? 'fade-out' : 'fade-in'}`}>
          <img src={successImg} alt={'success-img'} />
          <p>
            All done! <br /> Your idea submitted successfully!
          </p>
        </div>
      )}
    </form>
  );
};

export default Form;
