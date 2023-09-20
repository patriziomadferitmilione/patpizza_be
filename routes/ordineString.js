const express = require('express')
const router = express.Router()
const OrdineString = require('../models/ordineStringModel')

//Post Method
router.post('/newOrdineString', async (req, res) => {
  const data = new OrdineString({
    ordineString: req.body.ordineString,
    ordine_id: req.body.ordine_id,
    createdAt: req.body.createdAt,
  })

  try {
    const dataToSave = await data.save()
    res.status(200).json({ _id: dataToSave._id, ...dataToSave._doc })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Get all Method
router.get('/getAllOrdineString', async (req, res) => {
  try {
    const data = await OrdineString.find().sort({ nome: 'asc' }) // Sort in ascending order by 'nome' property
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get by ID Method
router.get('/getOrdineString/:id', async (req, res) => {
  try {
    const data = await OrdineString.findById(req.params.id)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get by ordineID Method
router.get('/getOrdineStringByOrdineId/:ordine_id', async (req, res) => {
  try {
    const data = await OrdineString.find({ ordine_id: req.ordine_id })
      .sort({ createdAt: -1 })
      .limit(1)
      .exec()

    // Check if data was found
    if (data.length === 0) {
      res
        .status(404)
        .json({ message: 'No OrdineString found for the provided ordine_id.' })
      return
    }

    res.json(data[0]) // Return the most recent ordineString
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Update by ID Method
router.patch('/updateOrdineString/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updatedData = req.body
    const options = { new: true }

    const result = await OrdineString.findByIdAndUpdate(
      id,
      updatedData,
      options
    )

    res.send(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Delete by ID Method
router.delete('/deleteOrdineString/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = await OrdineString.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Export the router
module.exports = router
