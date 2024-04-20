const connection = require('../config/dbConfig');

const Voiture = {
    create: (car, callback) => {
      connection.query('INSERT INTO Voiture SET ?', car, callback);
    },
    read: (callback) => {
      connection.query('SELECT * FROM Voiture', callback);
    },
    readOne: (id, callback) => {
      connection.query('SELECT * FROM Voiture WHERE id = ?', id, callback);
    },
    update: (id, car, callback) => {
      connection.query('UPDATE Voiture SET ? WHERE id = ?', [car, id], callback);
    },
    uploadImage: (id, car, callback) => {
      connection.query('UPDATE Voiture SET ? WHERE id = ?', [car, id], callback);
    },
    delete: (id, callback) => {
      connection.query('DELETE FROM Voiture WHERE id = ?', id, callback);
    },
  };
  
  module.exports = Voiture;