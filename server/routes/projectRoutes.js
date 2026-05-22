const express = require("express");

const Project = require("../models/Project");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE PROJECT
router.post("/", verifyToken, async (req, res) => {

  try {

    const { projectName, description, teamMembers } = req.body;

    const newProject = new Project({
      projectName,
      description,
      teamMembers
    });

    await newProject.save();

    res.status(201).json({
      message: "Project Created Successfully",
      project: newProject
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// GET ALL PROJECTS
router.get("/", verifyToken, async (req, res) => {

  try {

    const projects = await Project.find()
      .populate("teamMembers", "name email");

    res.status(200).json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
router.delete("/:id", verifyToken, async (req, res) => {

  try {

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Project Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
module.exports = router;