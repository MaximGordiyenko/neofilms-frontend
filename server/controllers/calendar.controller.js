import { CalendarService } from '../services/calendar.service.js';

export const getCalendars = async (req, res, next) => {
  try {
    const getAllCalendars = await CalendarService.getCalendars();
    return res.status(200).json(getAllCalendars);
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
};

export const getCalendar = async (req, res, next) => {
  try {
    const { event_id } = req.params;
    const [event] = await CalendarService.getEvent(event_id);
    res.status(200).send(event);
  } catch (error) {
    next(error);
  }
};

export const addCalendar = async (req, res, next) => {
  try {
    const { id, name, description, date } = req.body;
    await CalendarService.createCalendar(id, name, description, date);
    res.status(200).send({ message: 'data was added' });
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const { event_id } = req.params;
    const id = event_id;
    const { name, description, date } = req.body;
    console.log(id, name, description, date);
    await CalendarService.updateEvent(id, name, description, date);
    res.status(200).send({ message: 'data was updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteCalendarById = async (req, res, next) => {
  try {
    const { event_id } = req.params;
    await CalendarService.deleteCalendarById(event_id);
    res.status(200).send({ message: 'data was deletes' });
  } catch (error) {
    next(error);
  }
};
