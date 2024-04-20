const Achat = require('../models/Achat');
const LigneAchat = require('../models/LigneAchat');


// ########################################################################
exports.create = (req, res) => {
  const achat = {
    id_cli: parseInt(req.body.id_cli)
  }
  Achat.create(achat, (err, result) => {
    if (err) res.send(err);
    const resultat = ''
    //#################################
    if (result.insertId != "") {
      if (req.body.voiture.length > 0) {
        let promises = []; 
        //################  boucle foreach
        req.body.voiture.forEach(element => {
          const lign_fac = {
            id_achat: parseInt(result.insertId),
            id_voiture: parseInt(element.id_voiture),
            Qte: parseInt(element.Qte)
          }
          //#######################
          let promise = new Promise((resolve, reject) => {
            LigneAchat.create(lign_fac, (err, restat) => {
              if (err) reject(err);
              resolve(restat);
            });
          })
          promises.push(promise); // push-er  le res promise to the array
        });
        Promise.all(promises)
          .then(results => {
            res.send(results); 
          })
          .catch(err => {
            res.send(err); 
          });
      }
    }
  });
};

// ######################################################################## readOnePdf 
exports.read = (req, res) => {
  Achat.read((err, result) => {
    if (err) throw res.send(err);
    res.status(201).send(result);
  });
};

// ########################################################################
exports.readOnePdf = (req, res) => {
  Achat.readOnePdf(req.params.id, (err, result) => {
    if (err) throw res.send(err);
    res.send(result);
  });
};


// ########################################################################
exports.readOne = (req, res) => {
  Achat.readOne(req.params.id, (err, result) => {
    if (err) throw res.send(err);
    res.send(result);
  });
};

exports.update = (req, res) => {
  Achat.update(req.params.id, req.body, (err, result) => {
    if (err) throw res.send(err);
    res.send(result);
  });
};


// ########################################################################
exports.delete = (req, res) => {
  Achat.delete(req.params.id, (err, result) => {
    if (err) throw res.send(err);
    res.send(result);
  });
};