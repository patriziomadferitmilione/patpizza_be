const express = require('express');
const router = express.Router();
const Menu = require('../models/MenuModel')

//Post Method
router.post('/newMenu', async (req, res) => {
    const data = new Menu({
        nome: req.body.nome,
        ingredienti: req.body.ingredienti,
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
router.get('/getMenu', async (req, res) => {
    try{
        const data = await Menu.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getMenuItem/:id', async (req, res) => {
    try{
        const data = await Menu.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateMenu/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Menu.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/deleteMenu/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Menu.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})



// Export the router
module.exports = router;