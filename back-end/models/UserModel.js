module.exports =(sequelize, DataTypes) =>{
    const User = sequelize.define("User",{
          UserID:{
              type:DataTypes.STRING,
              allowNull:false,
              unique: true
          },
          FirstName:{
              type:DataTypes.STRING,
              allowNull:false,
          },
          LastName:{
              type:DataTypes.STRING,
              allowNull:false,
          },
          Gender:{
              type:DataTypes.STRING,
              allowNull:false,
          },
          
          UserName:{
              type:DataTypes.STRING,
              allowNull:false,
              unique: true,
          },
          
          Password:{
              type:DataTypes.STRING,
              allowNull:false,
          },
         
          Email:{
              type:DataTypes.STRING,
              allowNull:false,
              unique: true,
          },
         
         PhoneNumber:{
              type:DataTypes.INTEGER,
              allowNull:false,
          },
         Address:{
              type:DataTypes.STRING,
              allowNull:false,
          },
         
      },{
        timestamps: true
      });
  
  return User;
  }