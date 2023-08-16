const bcrypt = require('bcrypt');

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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Role: {
        type: DataTypes.ENUM('Admin', 'User'),
        defaultValue: 'User',
      },
    },
    {
      timestamps: true
    }
  );

  return User;
};
// [
//   {
//       "id": 2,
//       "UserID": "ETS767890",
//       "FirstName": "eden",
//       "LastName": "zewdu",
//       "Gender": "female",
//       "UserName": "eden1234",
//       "Password": "123456",
//       "Email": "eden1234@gmail.com",
//       "PhoneNumber": 4787980,
//       "Address": "addis",
//       "Role": "Admin",
//       "createdAt": "2023-08-08T09:33:36.000Z",
//       "updatedAt": "2023-08-10T13:26:57.000Z"
//   },
//   {
//       "id": 3,
//       "UserID": "ETS7690",
//       "FirstName": "eftu",
//       "LastName": "tesfaye",
//       "Gender": "female",
//       "UserName": "eftu1234",
//       "Password": "$2b$10$L3uGwqH3We4DVfvmIKQoR.RRiSGAYxvZNOQKt6FxYV8AJocZI6WOW",
//       "Email": "eftu1234@gmail.com",
//       "PhoneNumber": 769890,
//       "Address": "burayu",
//       "Role": "User",
//       "createdAt": "2023-08-10T09:22:54.000Z",
//       "updatedAt": "2023-08-10T09:22:54.000Z"
//   }
// ]