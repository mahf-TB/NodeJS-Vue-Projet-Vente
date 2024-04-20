const connection = require('../config/dbConfig');

const Client = {
    create: (etudiant, callback) => {
      connection.query('INSERT INTO Client SET `dateAjouter` = CURRENT_DATE, ?', etudiant, callback);
    },
    read: (callback) => {
      connection.query('SELECT * FROM Client', callback);
    },
    readOne: (id, callback) => {
      connection.query('SELECT * FROM Client WHERE id = ?', id, callback);
    },
    update: (id, etudiant, callback) => {
      connection.query('UPDATE Client SET ? WHERE id = ?', [etudiant, id], callback);
    },
    delete: (id, callback) => {
      connection.query('DELETE FROM Client WHERE id = ?', id, callback);
    },
  };
  
  module.exports = Client;