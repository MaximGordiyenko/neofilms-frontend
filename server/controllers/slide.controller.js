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
    
    await SlideService.createSlide(id, movie, logo_media, logo_text, additional_text, button_text, button_link);
    res.status(200).send({ message: 'data was added' });
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
};

export const updateSlide = async (req, res, next) => {
  try {
    const { additional_text, button_link, button_text, logo_media, logo_text, movie, id } = req.body;
    console.log(additional_text, button_link, button_text, logo_media, logo_text, movie, id);
    await SlideService.updateSlide(additional_text, button_link, button_text, logo_media, logo_text, movie, id);
    res.status(200).send({ message: 'data was updated' });
  } catch (error) {
    next(error);
  }
};

export const getMediaOfSlide = async (req, res, next) => {
  try {
    const { slide_id } = req.params;
    const [{ movie }] = await SlideService.getMediaOfSlide(slide_id);
    res.status(200).send(movie);
  } catch (error) {
    next(error);
  }
};

export const getSlide = async (req, res, next) => {
  try {
    const { slide_id } = req.params;
    const [slide] = await SlideService.getSlide(slide_id);
    res.status(200).send(slide);
  } catch (error) {
    next(error);
  }
};

export const deleteSlideById = async (req, res, next) => {
  try {
    const { slide_id } = req.params;
    await SlideService.deleteSlideById(slide_id);
    res.status(200).send({ message: 'data was deletes' });
  } catch (error) {
    next(error);
  }
};
