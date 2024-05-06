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
    const { id, movie, logo_media, logo_text, additional_text, button_text, button_link } = req.body;
    
    await SlideService.createSlide(movie, logo_media, logo_text, additional_text, button_text, button_link);
    res.status(200).send({ message: 'data was added' });
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
};

export const updateSlide = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  } catch (error) {
    next(error);
  }
}

export const getMediaOfSlide = async (req, res, next) => {
  try {
    const { slide_id } = req.params;
    console.log('getMedia:', slide_id);
    const [{ movie }] = await SlideService.getMediaOfSlide(slide_id);
    console.log('db:', movie);
    res.status(200).send(movie);
  } catch (error) {
    next(error);
  }
}
