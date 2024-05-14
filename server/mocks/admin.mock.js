import { AdminModel } from "../models/admin.model.js";

export const createAdmin = async () => {
  try {
    await AdminModel.sync({ force: true });
    await AdminModel.bulkCreate([
      {
        "id": "60jjfea0-78sc-4d68-9f6b-4fdfbdd537ff",
        "login": "max@gmail.com",
        "password": "123456qwerty",
      }
    ]);
    console.log(`${AdminModel.name} created 📲.`);
  } catch (error) {
    console.error(error);
  }
};
