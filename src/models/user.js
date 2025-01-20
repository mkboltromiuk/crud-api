const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

class User extends Model {
    async validatePassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 10);
            },
        },
    }
);

module.exports = User;
