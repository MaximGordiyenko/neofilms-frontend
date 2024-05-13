import express from 'express';
import { getCalendars, addCalendar, getCalendar, deleteCalendarById } from '../controllers/calendar.controller.js';

const router = express.Router();

router.get('/pages/events', getCalendars);
router.get('/pages/event/:event_id', getCalendar);

router.post('/pages/event/create', addCalendar);

router.delete('/pages/event/:event_id', deleteCalendarById);

export default router;
