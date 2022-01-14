
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

class Contact extends Model {}
Contact.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    }
  },
  { sequelize, modelName: "Contact" }
);

(async () => {
  await sequelize.sync();
  const jane = await Contact.create({
    firstName: "jane",
    lastName: "Doe",
    email: "jane@pum.com",
  });
  const peter = await Contact.create({
    firstName: "Peter",
    lastName: "Doe",
    email: "peter@pum.com",
  });
  let contacts = await Contact.findAll();
  console.log(contacts);
})();