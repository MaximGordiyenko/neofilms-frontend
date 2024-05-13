import { Calendar } from '../models/calendar.model.js';

export const CalendarService = (() => {
  
  const getCalendars = async () => {
    return await Calendar.findAll();
  };
  
  const getEvent = async (calendar_id) => {
    return await Calendar.findAll({
      where: {
        id: calendar_id
      }
    });
  };
  
  const createCalendar = async (id, name, description, date) => {
    await Calendar.create({
      "id": id,
      "name": name || "This is next one logo text",
      "description": description || "This is next one additional logo text",
      "date": date || 1715079981000,
    });
  };
  
  const deleteCalendarById = async (calendar_id) => {
    const deletedCount = await Calendar.destroy({
      where: {
        id: calendar_id
      }
    });
    
    if (deletedCount === 0) {
      // No slide was deleted (slide with the given ID not found)
      return { success: false, message: 'Calendar not found' };
    }
    
    // Slide deleted successfully
    return { success: true, message: 'Calendar deleted successfully' };
  };
  
  return {
    getCalendars,
    getEvent,
    createCalendar,
    deleteCalendarById
  };
})();
