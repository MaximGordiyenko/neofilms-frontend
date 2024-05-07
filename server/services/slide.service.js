import { Slide } from '../models/slide.model.js';
import { v4 as uuidv4 } from 'uuid';

export const SlideService = (() => {
  
  const getSlides = async () => {
    return await Slide.findAll();
  };
  
  const createSlide = async (movie, logo_media, logo_text, additional_text, button_text, button_link) => {
    await Slide.create({
      id: uuidv4(),
      movie: "https://youtu.be/tfdwcqfuxwA?si=doY7D1wCUGi9kA9o",
      logo_media: "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg",
      logo_text: "This is next one logo text",
      additional_text: "This is next one additional logo text",
      button_text: "Google",
      button_link: "https://www.google.com/?client=safari"
    });
  };
  
  const getMediaOfSlide = async (slide_id) => {
    return await Slide.findAll({
      where: {
        id: slide_id
      }
    });
  };
  
  return {
    getSlides,
    createSlide,
    getMediaOfSlide
  };
})();
