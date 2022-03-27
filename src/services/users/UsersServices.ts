import User from '../../models/user';

class UsersServices {
  async verifyIfExistsById(id: string) {
    try {
      const user = await User.findById(id)
      return user;
    }catch (e) {
      return false
    }
  }
}

export default new UsersServices()