import { AdminModel } from '../models/admin.model.js';

export const AdminService = (() => {
  const signIn = async (login, password) => {
    const user = await AdminModel.findOne({
      where: { login }
    });
    
    if (!user) {
      return null;
    }
    
    if (user.password !== password) {
      return null;
    }
    
    return user;
  };
  
  return {
    signIn
  };
})();
