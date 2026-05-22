const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

const verifyToken = require("../middleware/authMiddleware");



// CREATE TASK
router.post("/", verifyToken, async (req, res) => {

  try {

    const task = await Task.create(req.body);

    res.status(201).json({
      message: "Task Created Successfully",
      task
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



// GET ALL TASKS
router.get("/", verifyToken, async (req, res) => {

  try {

    const tasks = await Task.find();

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



// UPDATE TASK
router.put("/:id", verifyToken, async (req, res) => {

  try {

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Task Updated Successfully",
      updatedTask
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



// DELETE TASK
router.delete("/:id", verifyToken, async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



module.exports = router;