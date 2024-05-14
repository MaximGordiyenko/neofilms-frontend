import { AdminModel } from '../models/admin.model.js';

export const AdminService = (() => {
  const signIn = async (login, password) => {
    try {
      const user = await AdminModel.findOne({
        where: { login }
      });
      
      if (!user.login) {
        return { error: 'Invalid login'};
      }
      
      if (user.password !== password) {
        return { error: 'Invalid password' };
      }
      
      return { login: user.login };
    } catch (error) {
      console.error('Error signing in:', error);
      return { error: 'An error occurred during sign-in. Please try again later.' };
    }
  };
  
  return {
    signIn
  };
})();
