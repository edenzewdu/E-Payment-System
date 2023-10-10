const bcrypt = require('bcrypt');
const { Agents, Payment, Bill } = require('.');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      UserID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: false,
      },
      UserName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      PhoneNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Role: {
        type: DataTypes.ENUM('SuperAdmin','Admin', 'User'),
        defaultValue: 'User',
      },
      ProfilePicture: {
        type: DataTypes.STRING, 
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.belongsToMany(models.ServiceProviders, {
      through: models.UserServiceProvider,
      foreignKey: 'UserId',
      as: 'Users',
    });
    User.belongsToMany(models.Agents, {
      through: models.userAgent,
      foreignKey: 'UserId',
      as: 'Agents',
    });
    User.hasMany(models.Payment, {
      foreignKey: 'UserId',
      as: 'payments',
    });
    User.hasMany(models.Bill, {
      foreignKey: 'UserId',
      as: 'Bills',
    });
};


  // Create a Admin user after the model is synced
User.afterSync(() => {
  User.findOne({ where: { Role: 'SuperAdmin' } }).then((superAdmin) => {
    if (!superAdmin) {
      const superAdminData = {
        UserID: 'superadmin',
        FirstName: 'Super',
        LastName: 'Admin',
        Gender: 'Male',
        UserName: 'superadmin',
        Password: bcrypt.hashSync('password', 10), // Set the hashed password
        Email: 'superadmin@example.com',
        PhoneNumber: '1234567890',
        Address: 'Super Admin Address',
        Role: 'SuperAdmin',
      };

      User.create(superAdminData)
        .then(() => {
          console.log('Super admin user created successfully.');
        })
        .catch((error) => {
          console.error('Error creating super admin user:', error);
        });
    }
  });
});


  return User;
};


