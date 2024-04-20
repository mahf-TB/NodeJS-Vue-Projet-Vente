
const connection = require('../config/dbConfig');

const Achat = {
    create: (achat, callback) => {
        connection.query('INSERT INTO Achat SET `dateAchat`=CURRENT_DATE, ?', achat, callback);
    },
    read: (callback) => {
        connection.query(
            "SELECT Achat.num_achat, Client.noms,Client.contact,"
            +"GROUP_CONCAT(CONCAT(Voiture.marque, ' ', Voiture.modele)) AS marques, COUNT(Ligne_Achat.id_voiture) AS nb_voitures,"
            + "SUM(Qte) AS Qte, Achat.dateAchat , "
            + "SUM(qte * Voiture.prix) AS prixTotal  FROM Achat "
            + "INNER JOIN Client ON Achat.id_cli = Client.id "
            + "INNER JOIN Ligne_Achat ON Ligne_Achat.id_achat = Achat.num_achat "
            + "INNER JOIN Voiture ON Ligne_Achat.id_voiture = Voiture.id "
            + "GROUP BY Achat.num_achat, Client.noms;", 
        callback); 
    },
    readOne: (id, callback) => {
        connection.query(
            "SELECT Achat.num_achat,"
            + "Client.noms, Client.contact, GROUP_CONCAT(CONCAT(Voiture.marque, ' ', Voiture.modele)) AS marques, "
            + "COUNT(Ligne_Achat.id_voiture) AS nb_voitures, "
            + "SUM(Qte) AS Qte, "
            + "SUM(qte * Voiture.prix) AS prixTotal  FROM Achat "

            + "INNER JOIN Client ON Achat.id_cli = Client.id "
            + "INNER JOIN Ligne_Achat ON Ligne_Achat.id_achat = Achat.num_achat "
            + "INNER JOIN Voiture ON Ligne_Achat.id_voiture = Voiture.id "
            + "WHERE Achat.num_achat = ? ;", 
             id, callback);
    }, 
    readOnePdf: (id, callback) => {
        connection.query(
            "SELECT Achat.num_achat,"
            +" Client.noms, Client.contact, CONCAT(Voiture.marque, ' ', Voiture.modele) AS marques, "
            +" Qte AS Qte, Voiture.prix,"
            +"qte * Voiture.prix AS prixTotal , Achat.dateAchat "
            +"FROM Achat "
            +" INNER JOIN Client ON Achat.id_cli = Client.id  "
            +" INNER JOIN Ligne_Achat ON Ligne_Achat.id_achat = Achat.num_achat "
            +" INNER JOIN Voiture ON Ligne_Achat.id_voiture = Voiture.id  "
            +" WHERE Achat.num_achat = ? ;" ,
             id, callback);
    },
    update: (id, achat, callback) => {
        connection.query('UPDATE Achat SET ? WHERE num_achat = ?', [achat, id], callback);
    },
    delete: (id, callback) => {
        connection.query('DELETE FROM Achat WHERE num_achat = ?', id, callback);
    },
}; 

module.exports = Achat;