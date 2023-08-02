module.exports = (sequelize, DataTypes) => {
    const payment = sequelize.define("payment", {
        paymentID:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paymentDate:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        referenceNumber:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    });
    return payment;
};