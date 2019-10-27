import Sequelize, { Model } from 'sequelize';

class Subject extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING
        },
            {
                sequelize
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.User, { through: 'users_subjects', foreignKey: 'subject_id', as: 'user' })
    }
}

export default Subject;
