const { Sequelize } = require('sequelize');
const  { config } = require('../config/config');
const setupModels = require('./../models');
  
const sequelize = new Sequelize(
    config.dbName, 
    config.dbUser, 
    config.dbPassword, 
    {
      host: config.dbHost,
      dialect: 'postgresql',
      port: config.dbPort, 
      logging: console.log,
    }
  );

  sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//sequelize.sync(); /*Sincronizar model EDR  */

setupModels(sequelize);

module.exports = sequelize;