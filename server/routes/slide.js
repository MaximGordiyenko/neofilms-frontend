import express from 'express';
import { getSlides, addSlide } from '../controllers/slide.controller.js';


const router = express.Router();

router.get('/pages/slides', getSlides);
router.post('/pages/slide', addSlide);

export default router;
