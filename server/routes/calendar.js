import express from 'express';
import { getCalendars, addCalendar, updateEvent, getCalendar, deleteCalendarById } from '../controllers/calendar.controller.js';

const router = express.Router();

router.get('/pages/events', getCalendars);
router.get('/pages/event/:event_id', getCalendar);

router.post('/pages/event/create', addCalendar);
router.post('/pages/event/:event_id', updateEvent);

router.delete('/pages/event/:event_id', deleteCalendarById);

export default router;
