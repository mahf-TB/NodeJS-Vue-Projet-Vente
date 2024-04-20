const Etudiant = require('../models/Client');

exports.create = (req, res) => {
  const etudiant = {
    noms: req.body.noms,
    adresse: req.body.adresse,
    contact: req.body.contact,
    email: req.body.email,
  }
  if (etudiant.noms == '' || etudiant.adresse == '' || etudiant.contact == '') {
    res.send( msgErr = {
      message: "verifier votre noms ou adresse ou contact",
      status: 500
    }); 
  } else {
    if (etudiant.contact.length < 10) { 
      res.send(msgErr = {
        message: "verifier les contact (10) dix caractere min", 
        status: 500
      });
    } else {
      Etudiant.create(etudiant, (err, result) => {
        if (err) throw err;
        res.json(result.insertId);
      }); 
    } 
  } 
};


exports.read = (req, res) => {
  Etudiant.read((err, result) => {
    if (err) throw res.send(err);
    res.status(201).send(result);
  });
}; 


exports.readOne = (req, res) => {
  Etudiant.readOne(req.params.id, (err, result) => {
    if (err) throw res.send(err); 
    res.send(result); 
  });
};


exports.update = (req, res) => {
  Etudiant.update(req.params.id, req.body, (err, result) => {
    if (err) throw res.send(err);
    res.send(result);
  });
};


exports.delete = (req, res) => {
  Etudiant.delete(req.params.id, (err, result) => {
    if (err) throw res.send(err);
    res.send(result);
  });
};
