import { Slide } from "../models/slide.model.js";
import { v4 as uuidv4 } from 'uuid';

export const createSlide = async () => {
  try {
    await Slide.sync({ force: true });
    await Slide.bulkCreate([
      {
        "id": "60cdfea0-787c-4d68-9f6b-4fdfb79537ff",
        "movie": {
          "lastModified": 1715079981000,
          "name": "Screenshot 2024-05-07 at 14.06.17.png",
          "path": "Screenshot 2024-05-07 at 14.06.17.png",
          "size": 26444,
          "type": "image/png",
          "webkitRelativePath": ""
        },
        "logo_media": {
          "lastModified": 1715079981000,
          "name": "Screenshot 2024-05-07 at 14.06.17.png",
          "path": "Screenshot 2024-05-07 at 14.06.17.png",
          "size": 26444,
          "type": "image/png",
          "webkitRelativePath": ""
        },
        "logo_text": "This is next one logo text",
        "additional_text": "This is next one additional logo text",
        "button_text": "Google",
        "button_link": "https://www.google.com/?client=safari"
      }
    ]);
    console.log(`${Slide.name} created 📲.`);
  } catch (error) {
    console.error(error);
  }
};
