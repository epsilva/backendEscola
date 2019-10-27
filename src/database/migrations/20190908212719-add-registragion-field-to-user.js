'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'users',
            'registration',
            {
                type: Sequelize.INTEGER,
                allowNull: true
            }
        )
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('users', 'registration' )
    }
};
