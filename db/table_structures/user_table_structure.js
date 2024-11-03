const { DataTypes } = require('sequelize');
module.exports = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "firstName can not be null"
            },
            notEmpty: {
                msg: "firstName can not be empty"
            },
        }
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "lastName can not be null"
            },
            notEmpty: {
                msg: "lastName can not be empty"
            },
        }
    },

    userType: {
        type: DataTypes.ENUM('1', '2'),
        allowNull: false,
        validate: {
            notNull: {
                msg: "userType can not be null"
            },
            notEmpty: {
                msg: "userType can not be empty"
            },
            // isIn: {
            //     value: [1, 2],
            //     msg: "User type should be either 1 or 2"
            // }
        }
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Email can not be null"
            },
            notEmpty: {
                msg: "Email can not be empty"
            },
            isEmail: {
                msg: "Should be valid Email"
            }
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "password can not be null"
            },
            notEmpty: {
                msg: "password can not be empty"
            },
        }
    },
    access_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    token_expire: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },

    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    deletedAt: {
        type: DataTypes.DATE,
    }
}