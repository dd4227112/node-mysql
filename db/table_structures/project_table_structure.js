const { DataTypes } = require('sequelize');

module.exports = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Project name cannot be null"
            },
            notEmpty: {
                msg: "Project name cannot be empty"
            },
            len: {
                args: 3,
                msg: "project should be atleast 3 charcters"
            }
        }
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Project name cannot be null"
            },
            notEmpty: {
                msg: "Project name cannot be empty"
            }
        }
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "location cannot be null"
            },
            notEmpty: {
                msg: "location cannot be empty"
            }
        }
    },
    cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: {
                msg: "cost cannot be null"
            },
            notEmpty: {
                msg: "cost cannot be empty"
            },
            min: {
                args: 100.00,
                msg: "Minimin cost for a prject is $100"
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Title cannot be null"
            },
            notEmpty: {
                msg: "Title  cannot be empty"
            },
            len: {
                args: 5,
                msg: "Title should be atleast 5 charcters"
            }
        }
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Tags cannot be null"
            },
            notEmpty: {
                msg: "Tags  cannot be empty"
            },
        }
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: {
                tableName: 'users',
                schema: 'public',
            },
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
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
        type: DataTypes.DATE
    }

}