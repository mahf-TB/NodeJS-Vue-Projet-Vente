const Voiture = require('../models/Voiture');
const upload = require('../config/multer.config');
const fs = require('fs').promises;

exports.create = (req, res) => {

  upload.single('image')(req, res, (err) => {
    if (err) {
      res.status(500).json({
        message: "Une erreur s'est produite lors du téléchargement de l'image.",
        status: 500
      });
    } else {
      const car = {
        marque: req.body.marque,
        modele: req.body.modele,
        design: req.body.design,
        prix: parseFloat(req.body.prix),
        nombre: parseInt(req.body.nombre),
        image: req.file.filename
      }
      if (car.design == '' || car.prix == '' || car.nombre == '') {
        res.send(msgErr = {
          message: "verifier votre noms ou adresse ou contact",
          status: 500
        });
      } else {
        Voiture.create(car, (erro, result) => {
          if (erro) throw erro;
          res.send(result);
        });
      }
    }
  });

};

// exports.uploadImage = async (req, res) => {
//   Voiture.readOne(req.params.id, async (err, result) => {
//     if (err) throw res.send(err);
//     if (result[0].image != "") {
//       const oldImagePath = 'uploads/images/' + result[0].image;
//       if (fs.access(oldImagePath)) {
//         await fs.unlink(oldImagePath)
//       }
//     }
//     upload.single('image')(req, res, (err) => {
//       if (err) {
//         res.status(500).json({
//           message: "Une erreur s'est produite lors du téléchargement de l'image.",
//           status: 500
//         });
//       } else {
//         const carFile = {
//           image: req.file.filename
//         }
//         Voiture.uploadImage(req.params.id, carFile, (err, result) => {
//           if (err) throw res.send(err);
//           res.send(result);
//         });
//       }
//     })
//   });

// };

exports.read = (req, res) => {
  Voiture.read((err, result) => {
    if (err) throw res.send(err);
    res.status(201).send(result);
  });
};

exports.readOne = (req, res) => {
  Voiture.readOne(req.params.id, (err, result) => {
    if (err) throw res.send(err);
    res.send(result);
  });
};

exports.update = (req, res) => {

    // importer les image telecharger
    upload.single('image')(req, res, (err) => {
      if (err) {
        res.status(500).json({
          message: "Une erreur s'est produite lors du téléchargement de l'image.",
          status: 500
        });
      } else {
        if (req.file) {
          Voiture.readOne(req.params.id, async (err, result) => {
            if (err) throw res.send(err);
            if (result[0].image != "") {
              const oldImagePath = 'uploads/images/' + result[0].image;
              if (fs.access(oldImagePath)) {
                await fs.unlink(oldImagePath)
              }
            }
            // affectter dans le const Car tout le valeur update
            const car = {
              marque: req.body.marque,
              modele: req.body.modele,
              design: req.body.design,
              prix: parseFloat(req.body.prix),
              nombre: parseInt(req.body.nombre),
              image: req.file.filename
            }
  
            Voiture.update(req.params.id, car, (erro, result) => {
              if (erro) throw res.send(erro);
              res.send(result);
            });
  
          });
        }else{
          Voiture.update(req.params.id, req.body, (erro, result) => {
            if (erro) throw res.send(erro);
            res.json({
              message: result,
              status: 200
            });
          });
        }
        
      }

    });

};

exports.delete = async (req, res) => {
  Voiture.readOne(req.params.id, async (err, result) => {
    if (err) throw res.send(err);
    const oldImagePath = 'uploads/images/' + result[0].image;
    if (!fs.access(oldImagePath)) {
      res.send("Une erreur s'est produite lors du suppression de l'image ancienne");
    } else {
      await fs.unlink(oldImagePath)
      Voiture.delete(req.params.id, (err, result) => {
        if (err) throw res.send(err);
        res.send(result);
      });
    }
  });
};