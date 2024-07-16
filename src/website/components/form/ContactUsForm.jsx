import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import dots from '../../assets/images/thripleDots.svg';
import CustomDropdown from '../dropdown/CustomDropdown';
import clipleft from '../../assets/images/clipleft.svg';
import clipright from '../../assets/images/clipright.svg';
import emailjs from '@emailjs/browser';
import bgBorder from '../../assets/images/buttonSvg.svg';
import successImg from '../../assets/images/success.svg';

const ContactForm = () => {
  const [userName, setUserName] = useState({ value: '', error: '' });
  const [userEmail, setUserEmail] = useState({ value: '', error: '' });
  const [userCompany, setUserCompany] = useState({ value: '', error: '' });
  const [userPhone, setUserPhone] = useState({ value: '', error: '' });
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

  const handleBtnPressed = () => {
    setIsBtnPressed(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isError = false;
    const userCredentials = {
      username: userName.value,
      userEmail: userEmail.value,
      userCompany: userCompany.value,
      concept: userConcept.value,
      phone: userPhone.value,
    };
    if (!userCredentials.username) {
      setUserName({ value: '', error: 'Name is require' });
      isError = true;
    }
    if (!userCredentials.userEmail) {
      setUserEmail({ value: '', error: 'Please, enter a email' });
      isError = true;
    }
    if (!userCredentials.userCompany) {
      setUserCompany({ value: '', error: 'Tell us your company' });
      isError = true;
    }
    if (!userCredentials.phone) {
      setUserPhone({ value: '', error: 'Tell us your phone number' });
      isError = true;
    }
    if (!userCredentials.concept) {
      setUserConcept({ value: '', error: 'Please, concept need' });
      isError = true;
    }
    if (!isError) {
      setUserName({ value: '', error: '' });
      setUserEmail({ value: '', error: '' });
      setUserCompany({ value: '', error: '' });
      setUserConcept({ value: '', error: '' });
      setUserPhone({value: '', error: ''})
      try {
        console.log('The email is valid');
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
const handleChangeEmail = (e) => {
  setUserEmail({ value: e.target.value, error: '' });
  setIsFilled(true);
};
const handleCompany = (e) => {
  setUserCompany({ value: e.target.value, error: '' });
  setIsFilled(true);
};
const handleChangePhone = (e) => {
  setUserPhone({ value: e.target.value, error: '' });
  setIsFilled(true);
};
console.log(isBtnPressed, 'isBtnPressed');
return (
  <form className="contact-form-container" ref={form} onSubmit={handleSubmit}>
    <div className={'inputs-container'}>
      <div className={'name-box'}>
        <label htmlFor="user_name">How should we call you?</label>
        <div className={'custom-input-box'}>
          <img src={clipleft} alt={'inp-clip-l'} />
          <input
            type="text"
            placeholder={'Dave?'}
            id="input1"
            name={'user_name'}
            value={userName.value}
            onChange={handleChangeName}
          />
          <img src={clipright} alt={'inp-clip-r'} />
        </div>
        {userName.error && <span className="error-message">{userName.error}</span>}
      </div>
      <div className={'discord-address'}>
        <label htmlFor="input2">Your Email</label>
        <div className={'custom-input-box'}>
          <img src={clipleft} alt={'inp-clip-l'} />
          <input
            placeholder={'dave@mail.com'}
            type="text"
            id="input2"
            name="discord_name"
            value={userEmail.value}
            onChange={handleChangeEmail}
          />
          <img src={clipright} alt={'inp-clip-r'} />
        </div>
        {userEmail.error && <span className="error-message">{userEmail.error}</span>}
      </div>
      <div className={'project-name'}>
        <label htmlFor="best_movie">Your phone number</label>
        <div className={'custom-input-box'}>
          <img src={clipleft} alt={'inp-clip-l'} />
          <input
            placeholder={'+1 (555) 555 35 35'}
            type="text"
            id="input3"
            name="best_movie"
            onChange={handleChangePhone}
            value={userPhone.value}
          />
          <img src={clipright} alt={'inp-clip-r'} />
        </div>
        {userPhone.error && <span className="error-message">{userPhone.error}</span>}
      </div>
      <div className={'budget-box'}>
      <label htmlFor="best_movie">Your company</label>
          <div className={'custom-input-box'}>
            <img src={clipleft} alt={'inp-clip-l'} />
            <input
              placeholder={'Davebusiness'}
              type="text"
              id="input3"
              name="best_movie"
              onChange={handleCompany}
              value={userCompany.value}
            />
            <img src={clipright} alt={'inp-clip-r'} />
          </div>
          {userCompany.error && <span className="error-message">{userCompany.error}</span>}
        </div>
      </div>
      <label htmlFor="textarea" className={'textarea-label'}>
        So... Whats up?
      </label>
      <textarea
        className={'textarea-form'}
        placeholder={'Hello'}
        id="textarea"
        name="concept"
        value={userConcept.value}
        onChange={handleChangePhone}
        // value={formData.concept}
        // onChange={handleChange}
      ></textarea>
      {userConcept.error && <span className="error-message">{userConcept.error}</span>}
      <div className={'button-form-box'}>
        <img src={dots} alt={'dots-form'} className={'dots-form'} />
        <div className={'hr-line-form'} />
        <button
          type="submit"
          className={'submit-btn'}
          onClick={handleBtnPressed}
          disabled={!isFilled}>
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

export default ContactForm;
