const express = require('express')
const router = express.Router()
const Pizza = require('../models/pizzaModel')

//Post Method
router.post('/newPizza', async (req, res) => {
  const data = new Pizza({
    nome: req.body.nome,
    aggiunte: req.body.aggiunte,
    rimozioni: req.body.rimozioni,
    ordine_id: req.body.ordine_id,
    quantita: req.body.quantita,
    note: req.body.note,
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
router.get('/getPizze', async (req, res) => {
  try {
    const data = await Pizza.find()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Duplicate by ID Method
router.post('/duplicatePizza/:id', async (req, res) => {
  try {
    const id = req.params.id
    const originalPizza = await Pizza.findById(id)

    if (!originalPizza) {
      return res.status(404).json({ message: 'Pizza not found' })
    }

    // Create a copy of the originalPizza and remove its _id property
    const copiedPizzaData = originalPizza.toObject()
    delete copiedPizzaData._id

    const copiedPizza = new Pizza(copiedPizzaData)

    const savedPizza = await copiedPizza.save()
    res.status(200).json({ _id: savedPizza._id, ...savedPizza._doc })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Get by ID Method
router.get('/getPizza/:id', async (req, res) => {
  try {
    const data = await Pizza.findById(req.params.id)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get by Ordine ID Method
router.get('/getOrdinePizze/:ordine_id', async (req, res) => {
  try {
    const data = await Pizza.find({ ordine_id: req.params.ordine_id })

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Records not found' })
    }

    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Update by ID Method
router.patch('/updatePizza/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updatedData = req.body
    const options = { new: true }

    const result = await Pizza.findByIdAndUpdate(id, updatedData, options)

    res.send(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// //Update ADD by ID Method
// router.patch('/addAggiunte/:id', async (req, res) => {
//   try {
//     const id = req.params.id
//     const aggiunte = req.body.aggiunte

//     const result = await Pizza.findByIdAndUpdate(
//       id,
//       { $push: { aggiunte: { $each: aggiunte } } },
//       { new: true }
//     )

//     res.send(result)
//   } catch (error) {
//     res.status(400).json({ message: error.message })
//   }
// })

const axios = require('axios')

//Update ADD by ID Method
router.patch('/addAggiunte/:id', async (req, res) => {
  try {
    const id = req.params.id
    const aggiunte = req.body.aggiunte

    // Fetch nome for each aggiunte using axios and replace in the array
    for (let i = 0; i < aggiunte.length; i++) {
      try {
        const response = await axios.get(
          `https://patpizza-be.onrender.com/ingrediente/getIngredienteProg/${aggiunte[i]}`
        )

        if (response.data && response.data.nome) {
          aggiunte[i] = response.data.nome
        } else {
          // Handle case where no nome was returned or there was an issue with the API response
          throw new Error(`Could not fetch nome for aggiunte: ${aggiunte[i]}`)
        }
      } catch (err) {
        // Log the error and continue with the next iteration (or handle it differently based on your requirements)
        console.error(err.message)
      }
    }

    const result = await Pizza.findByIdAndUpdate(
      id,
      { $push: { aggiunte: { $each: aggiunte } } },
      { new: true }
    )

    res.send(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Update REMOVE by ID Method
router.patch('/addRimozioni/:id', async (req, res) => {
  try {
    const id = req.params.id
    const rimozioni = req.body.rimozioni

    const result = await Pizza.findByIdAndUpdate(
      id,
      { $push: { rimozioni: { $each: rimozioni } } },
      { new: true }
    )

    res.send(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Delete by ID Method
router.delete('/deletePizza/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = await Pizza.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Export the router
module.exports = router
