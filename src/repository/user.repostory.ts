import dataSource from '../data-source';
import User from '../entity/user.entity';

const UserRepository = dataSource.getRepository(User).extend({
  findByUsername(username: string) {
    return this.createQueryBuilder('User').where('user.username = :username', {
      username,
    });
  },
});
export default UserRepository;
