const connection = require('../config/dbConfig');

const LigneAchat = {
    create: (Ligne, callback) => {
      connection.query('INSERT INTO Ligne_Achat SET ?', Ligne, callback);
    },
  };
  
  module.exports = LigneAchat;