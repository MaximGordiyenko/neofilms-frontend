import { AdminService } from '../services/admin.service.js';

export const signIn = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const data = await AdminService.signIn(login, password);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
};
