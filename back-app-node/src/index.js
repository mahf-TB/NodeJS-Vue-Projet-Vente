const express = require("express");
const cors = require('cors')

const upload = require('./config/multer.config');

const app = express()
const port = process.env.PORT || 3000

const clientRoutes = require('./routes/client.routes');
const carRoutes = require('./routes/car.routes');
const achatRoutes = require('./routes/achat.routes');
  

app.use(express.json());
app.use(cors());
app.use(express.static('uploads'))

app.post('/import', upload.single('image'), (req, res) => {
    res.send('importation avec success')
})

app.use('/client', clientRoutes)
app.use('/voiture', carRoutes)
app.use('/achat', achatRoutes)


app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`)
})