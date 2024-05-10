import express from 'express';
import { getSlides, addSlide, updateSlide, getMediaOfSlide, getSlide, deleteSlideById } from '../controllers/slide.controller.js';


const router = express.Router();

router.get('/pages/slides', getSlides);
router.get('/pages/slide/:slide_id/movie', getMediaOfSlide);
router.get('/pages/slide/:slide_id', getSlide);

router.post('/pages/slide/create', addSlide);
router.post('/pages/slide/update', updateSlide);

router.delete('/pages/slide/:slide_id', deleteSlideById);

export default router;
