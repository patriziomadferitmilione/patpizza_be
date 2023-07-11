const express = require('express');
const router = express.Router();
const Ordine = require('../models/ordineModel')

//Post Method
router.post('/newOrdine', async (req, res) => {
    const data = new Ordine({
        customer_id: req.body.customer_id,
        indirizzo: req.body.indirizzo,
        nomeCampanello: req.body.nomeCampanello,
        orarioConsegna: req.body.orarioConsegna,
        zona: req.body.zona,
        note: req.body.note,
        createdAt: req.body.createdAt
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json({ _id: dataToSave._id, ...dataToSave._doc });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//Get all Method
router.get('/getOrdini', async (req, res) => {
    try{
        const data = await Ordine.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOrdine/:id', async (req, res) => {
    try{
        const data = await Ordine.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateOrdine/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Ordine.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/deleteOrdine/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Ordine.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})



// Export the router
module.exports = router;