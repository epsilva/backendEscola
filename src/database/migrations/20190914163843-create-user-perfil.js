'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users_perfis', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            subject_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                references: {
                    model: 'perfis',
                    key: 'id'
                }
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users_perfis');
    }
};
