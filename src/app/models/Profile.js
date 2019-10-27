import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Profile extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING
        },
            {
                sequelize
            });

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.User, { through: 'users_perfis', foreignKey: 'subject_id', as: 'user' })
    }
}

export default Profile;
