import { SlideService } from '../services/slide.service.js';

export const getSlides = async (req, res, next) => {
  try {
    const getAllSlides = await SlideService.getSlides();
    return res.status(200).json(getAllSlides);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addSlide = async (req, res, next) => {
  try {
    const { movie, logo_media, logo_text, additional_text, button_text, button_link } = req.body;
    
    await SlideService.createSlide(movie, logo_media, logo_text, additional_text, button_text, button_link);
    res.status(200).send({ message: 'data was added' });
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
};
