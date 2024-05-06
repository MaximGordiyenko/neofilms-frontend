import { Slide } from "../models/slide.model.js";

export const createSlide = async () => {
  try {
    await Slide.sync({ force: true });
    await Slide.bulkCreate([
      {
        "id": "60cdfea0-787c-4d68-9f6b-4fdfb79537ff",
        "movie": "https://youtu.be/tfdwcqfuxwA?si=doY7D1wCUGi9kA9o",
        "logo_media": "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg",
        "logo_text": "This is next one logo text",
        "additional_text": "This is next one additional logo text",
        "button_text": "Google",
        "button_link": "https://www.google.com/?client=safari",
      }
    ]);
    console.log(`${Slide.name} created 📲.`);
  } catch (error) {
    console.error(error);
  }
};
