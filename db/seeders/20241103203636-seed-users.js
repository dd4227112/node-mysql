const bcrypt = require('bcryptjs');
const password = bcrypt.hashSync('password', 8);
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        "firstName": "John",
        "lastName": "Doe",
        "userType": '1',
        "email": "john.doe'1'@example.com",
        "password": password,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "firstName": "Jane",
        "lastName": "Smith",
        "userType": '2',
        "email": "jane.smith'2'@example.com",
        "password": password,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "firstName": "Alice",
        "lastName": "Johnson",
        "userType": '1',
        "email": "alice.johnson3@example.com",
        "password": password,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "firstName": "Bob",
        "lastName": "Williams",
        "userType": '2',
        "email": "bob.williams4@example.com",
        "password": password,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "firstName": "Chris",
        "lastName": "Brown", 
        "userType": '1',
        "email": "chris.brown5@example.com",
        "password": password,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "firstName": "Dana",
        "lastName": "Garcia",
        "userType": '2',
        "email": "dana.garcia6@example.com",
        "password": password,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "firstName": "Eve",
        "lastName": "Martinez",
        "userType": '1',
        "email": "eve.martinez7@example.com",
        "password": password,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "firstName": "Frank",
        "lastName": "Lopez",
        "userType": '2',
        "email": "frank.lopez8@example.com",
        "password": password,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "firstName": "Grace",
        "lastName": "Gonzalez",
        "userType": '1',
        "email": "grace.gonzalez9@example.com",
        "password": password,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "firstName": "Hank",
        "lastName": "Anderson",
        "userType": '2',
        "email": "hank.anderson'1'0@example.com",
        "password": password,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ]
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};