const express = require('express');
const carSchema = require('../models/car');

const router = express.Router();

//create auto
router.post('/add-auto', (req, res) => {
    console.log("Este es el request para agregar autos: ",req.body);
    req.body._id=req.body.niv;
    const car = carSchema(req.body);
    
    //res.send(req.body);
    //res.send('Obtiene modelo OK');

    //.then((data) => res.json(data))
    car.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error.message}));
});

//Detalle completo de un auto en especifico por ID
router.get('/get-auto/:id', (req, res) => {
    console.log("Request de getAutoById: ", req.params);
    const { id } = req.params;
    
    carSchema
        .findById(id)
        .then((data) => res.json(data)) //Si es exitoso
        .catch((error) => res.json({message: error})); //Si hubo un error
    
});

//Lista de autos disponibles para comprar (Vista para usuario que comprara auto)
router.get('/get-auto-disponibles', (req,res) => {
    carSchema
        .find({
            disponible: { $eq : true }
        })
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

//Lista de autos por ids, estos perteneceran a un vendedor especifico
router.post('/get-list-autos', (req,res) => {
    const listIdCars = req.body;
    console.log("IdCars: ",listIdCars);
    carSchema
        .find({
            _id : listIdCars 
        })
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

//Delete completo de un auto en especifico por ID
router.delete('/delete-auto/:id', (req, res) => {
    console.log("Request de deleteAutoById: ", req.params);
    const { id } = req.params;
    
    carSchema
        .findByIdAndDelete(id).then((car) => {
            if (!car) {
                return res.status(404).send();
            }
            res.send(car);
        }).catch((error) => {
            res.status(500).send(error);
        }) 
    
});

router.post('/update-auto', (req, res) => {
    console.log("Este es el request para editar autos: ",req.body);
    let body = req.body;
    carSchema.findOneAndUpdate({ _id: body.id }, {
            $set: req.body
        },
        
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el cliente',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
});

module.exports = router;