const express = require('express')
const router = express.Router()
const Ordine = require('../models/ordineModel')
const mongoose = require('mongoose')

//Post Method
router.post('/newOrdine', async (req, res) => {
  const data = new Ordine({
    indirizzo: req.body.indirizzo,
    nomeCampanello: req.body.nomeCampanello,
    cellulare: req.body.cellulare,
    orarioConsegna: req.body.orarioConsegna,
    metodoPagamento: req.body.metodoPagamento,
    zona: req.body.zona,
    note: req.body.note,
    createdAt: req.body.createdAt,
  })

  try {
    const dataToSave = await data.save()
    res.status(200).json({ _id: dataToSave._id, ...dataToSave._doc })
  } catch (error) {
    console.error(error) // This will print the complete error object
    res.status(400).json({ message: error.message })
  }
})

//Get all Method
router.get('/getOrdini', async (req, res) => {
  try {
    const data = await Ordine.find().sort({ zona: 'asc' }) // Sort in ascending order by 'nome' property
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get all from today and how many per time slot
router.get('/getOrdiniTodayCount', async (req, res) => {
  try {
    // Get today's date
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set the time to midnight

    // Find records with 'createdAt' set to today
    const data = await Ordine.find({ createdAt: { $gte: today } })

    // Count records for each 'orarioConsegna' enum possible values
    const counts = {}
    data.forEach((ordine) => {
      if (ordine.orarioConsegna in counts) {
        counts[ordine.orarioConsegna]++
      } else {
        counts[ordine.orarioConsegna] = 1
      }
    })

    // Sort the counts object by key in chronological order
    const sortedCounts = Object.fromEntries(
      Object.entries(counts).sort((a, b) => {
        const aTime = Number(a[0].replace(':', ''))
        const bTime = Number(b[0].replace(':', ''))
        return aTime - bTime
      })
    )

    res.json(sortedCounts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get all from today
router.get('/getOrdiniToday', async (req, res) => {
  try {
    // Get today's date
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set the time to midnight

    // Find records with 'createdAt' set to today
    const data = await Ordine.find({ createdAt: { $gte: today } })

    // Return the found records
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get by ID Method
router.get('/getOrdine/:id', async (req, res) => {
  try {
    const data = await Ordine.findById(req.params.id)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.patch('/updateOrdine/:id', async (req, res) => {
  try {
    const id = req.params.id

    // Check if the provided ID is valid (assuming you're using Mongoose with MongoDB)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format.' })
    }

    const updatedData = req.body
    const options = { new: true }

    const result = await Ordine.findByIdAndUpdate(id, updatedData, options)

    // If no result was found, it means there's no document with that ID
    if (!result) {
      return res.status(404).json({ message: `No order found with ID: ${id}` })
    }

    res.send(result)
  } catch (error) {
    console.error('Error occurred while updating order:', error) // Log the full error to the console

    // Send a more detailed error message in the response
    res.status(400).json({
      message: 'Error updating order.',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Optionally include the stack trace in development mode
    })
  }
})

//Delete by ID Method
router.delete('/deleteOrdine/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = await Ordine.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete all
router.delete('/deleteAllOrdines', async (req, res) => {
  try {
    await Ordine.deleteMany({})
    res.send('All Ordine documents have been deleted.')
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Export the router
module.exports = router
