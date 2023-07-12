const express = require("express");
const router = express.Router();
const Ingrediente = require("../models/ingredienteModel");

//Post Method
router.post("/newIngrediente", async (req, res) => {
  const data = new Ingrediente({
    nome: req.body.nome,
    progressivo: req.body.progressivo,
    categoria: req.body.categoria,
    note: req.body.note,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json({ _id: dataToSave._id, ...dataToSave._doc });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getIngredienti", async (req, res) => {
  try {
    const data = await Ingrediente.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by categoria
router.get("/getIngredienti/popolari", async (req, res) => {
  try {
    const data = await Ingrediente.find({ categoria: "popolari" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getIngredienti/carne", async (req, res) => {
  try {
    const data = await Ingrediente.find({ categoria: "carne" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getIngredienti/formaggi", async (req, res) => {
  try {
    const data = await Ingrediente.find({ categoria: "formaggi" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getIngredienti/verdura", async (req, res) => {
  try {
    const data = await Ingrediente.find({ categoria: "verdura" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getIngredienti/creme", async (req, res) => {
  try {
    const data = await Ingrediente.find({ categoria: "creme" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getIngredienti/vari", async (req, res) => {
  try {
    const data = await Ingrediente.find({ categoria: "vari" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getIngrediente/:id", async (req, res) => {
  try {
    const data = await Ingrediente.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by Progressivo
router.get("/getIngredienteProg/:progressivo", async (req, res) => {
  try {
    const data = await Ingrediente.findOne({
      progressivo: req.params.progressivo,
    });

    if (!data) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/updateIngrediente/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Ingrediente.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/deleteIngrediente/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Ingrediente.findByIdAndDelete(id);
    res.send(`Ingrediente ${data} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
