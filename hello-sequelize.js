const path = require('path');
const { Sequelize, Model, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite::memory:");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'my.db'),
    logging: false
})

debugger

class Contact extends Model {}
Contact.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
  },
  { sequelize, modelName: "Contact" }
);

(async () => {
  await sequelize.sync();
  
  const [jane, janeCreated] = await Contact.findOrCreate({
    where: { email: 'jane@pum.com' },
    defaults: {
      firstName: "jane",
      lastName: "Doe",

    }
  });
  
  console.log(jane.firstName, janeCreated);

  
  const [peter, peterCreated] = await Contact.findOrCreate({
    where: { email: "peter@pum.com"},
    defaults: {
      firstName: "Peter",
      lastName: "Doe",  
    }
  });

  console.log(peter.firstName, janeCreated);

  let contacts = await Contact.findAll();
  console.log(contacts.map(c => c.getDataValue('firstName')));

  await sequelize.close()
})();