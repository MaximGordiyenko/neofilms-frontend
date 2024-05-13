import { Calendar } from "../models/calendar.model.js";

export const createCalendar = async () => {
  try {
    await Calendar.sync({ force: true });
    await Calendar.bulkCreate([
      {
        "id": "10cdfesd-783c-4d61-956b-4fdfb7ww34f2",
        "name": "Hello movie",
        "description": "Lorem impus dolor set",
        "date": 1715079981000
      }
    ]);
    console.log(`${Calendar.name} created 📲.`);
  } catch (error) {
    console.error(error);
  }
};
