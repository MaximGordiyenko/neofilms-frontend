import { Slide } from '../models/slide.model.js';

export const SlideService = (() => {
  
  const getSlides = async () => {
    return await Slide.findAll();
  };
  
  const createSlide = async (id, movie, logo_media, logo_text, additional_text, button_text, button_link) => {
    console.log(id);
    await Slide.create({
      "id": id,
      "movie": {
        "lastModified": movie.lastModified || 1715079981000,
        "name": movie.name || "Screenshot 2024-05-07 at 14.06.17.png",
        "path": movie.path || "Screenshot 2024-05-07 at 14.06.17.png",
        "size": movie.size || 26444,
        "type": movie.type || "image/png",
        "webkitRelativePath": ""
      },
      "logo_media": {
        "lastModified": logo_media.lastModified || 1715079981000,
        "name": logo_media.name || "Screenshot 2024-05-07 at 14.06.17.png",
        "path": logo_media.path || "Screenshot 2024-05-07 at 14.06.17.png",
        "size": logo_media.size || 26444,
        "type": logo_media.type || "image/png",
        "webkitRelativePath": ""
      },
      "logo_text": logo_text || "This is next one logo text",
      "additional_text": additional_text || "This is next one additional logo text",
      "button_text": button_text || "Google",
      "button_link": button_link || "https://www.google.com/?client=safari"
    });
  };
  
  const getMediaOfSlide = async (slide_id) => {
    return await Slide.findAll({
      where: {
        id: slide_id
      }
    });
  };
  
  const getSlide = async (slide_id) => {
    return await Slide.findAll({
      where: {
        id: slide_id
      }
    });
  };
  
  const updateSlide = async (additional_text, button_link, button_text, logo_media, logo_text, movie, id) => {
    return await Slide.update({ additional_text, button_link, button_text, logo_media, logo_text, movie }, {
      where: {
        id: id
      }
    });
  };
  
  const deleteSlideById = async (slide_id) => {
    const deletedCount = await Slide.destroy({
      where: {
        id: slide_id
      }
    });
    
    if (deletedCount === 0) {
      // No slide was deleted (slide with the given ID not found)
      return { success: false, message: 'Slide not found' };
    }
    
    // Slide deleted successfully
    return { success: true, message: 'Slide deleted successfully' };
  };
  
  return {
    getSlides,
    getSlide,
    createSlide,
    getMediaOfSlide,
    updateSlide,
    deleteSlideById
  };
})();
