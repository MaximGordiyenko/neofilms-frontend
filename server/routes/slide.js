import express from 'express';
import { getSlides, addSlide, updateSlide, getMediaOfSlide } from '../controllers/slide.controller.js';


const router = express.Router();

router.get('/pages/slides', getSlides);
router.get('/pages/slide/:slide_id/movie', getMediaOfSlide);

router.post('/pages/slide', addSlide);
router.post('/pages/slide/:slide_id', updateSlide);

export default router;
