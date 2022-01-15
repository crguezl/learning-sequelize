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
  
  const casiano = Contact.create({
    email: "crguezl@ull.es",
    firstName: "Casiano",
    lastName: "Rodriguez",
  });

  console.log(jane.firstName, janeCreated);
  
  const [peter, peterCreated] = await Contact.findOrCreate({
    where: { email: "peter@pum.com"},
    defaults: {
      firstName: "Peter",
      lastName: "Doe",  
    }
  });

  console.log(peter.firstName, peterCreated);

  // Example of updating Jane

  if (jane.firstName == 'jane') jane.firstName = "Ada Jane Rigoberta"
  else jane.firstName = "jane";
  // the name is still "Jane" in the database
  await jane.save();

  let contacts = await Contact.findAll();
  console.log(contacts.map(c =>[c.getDataValue('firstName'), c.getDataValue('id')]));

  let deleted = await jane.destroy();
  console.log(deleted.getDataValue('firstName'));
  
  
  let c = await Contact.update(
    { email: "crguezl@ull.edu.es"},
    { where: { firstName: "Casiano" } }
  );

  console.log(c);

  contacts = await Contact.findAll();
  console.log(contacts.map(c =>[c.getDataValue('firstName'), c.getDataValue('id'), c.getDataValue('email')]));

  await sequelize.close()
})();