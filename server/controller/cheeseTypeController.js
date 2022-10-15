const CheeseTypeModel = require("../models/CheeseType");
const { ObjectId } = require("mongodb");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res
      .status(400)
      .send({ success: false, message: "Content can not be empty!" });
    return;
  }

  // Create a record
  const cheeseType = new CheeseTypeModel({
    name: req.body.name,
    desc: req.body.desc,
    image: req.body.image,
  });

  // Save record in the database
  cheeseType
    .save(cheeseType)
    .then((data) => {
      res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while creating the Cheese Type.",
      });
    });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
  CheeseTypeModel.find()
    .lean()
    .then((cheese) => res.status(200).json({ success: true, cheese }))
    .catch((err) =>
      res.status(400).json({
        success: false,
        message:
          err.message ||
          "Some error occurred while retrieving the Cheese Type.",
      })
    );
};

exports.findById = (req, res) => {
  const id = JSON.parse(req.params.id);
  const filter = { _id: Object(id) };
  CheeseTypeModel.find(filter)
    .lean()
    .then((cheese) => res.status(200).json({ success: true, cheese }))
    .catch((err) =>
      res.status(400).json({
        success: false,
        message:
          err.message ||
          "Some error occurred while retrieving the Cheese Type record.",
      })
    );
};

// Update record by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ success: false, message: "Data to update can not be empty!" });
  }

  const id = JSON.parse(req.params.id);
  const filter = { _id: ObjectId(id) };

  CheeseTypeModel.findByIdAndUpdate(filter, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).json({ success: false, message: `Record not found!` });
      } else
        res.status(200).json({
          success: true,
          message: "The Cheese Type was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err.message || `Error updating this record`,
      });
    });
};

// Delete a record with the specified id in the request
exports.delete = (req, res) => {
  const id = JSON.parse(req.params.id);

  CheeseTypeModel.findByIdAndDelete({ _id: ObjectId(id) })
    .then((data) => {
      if (!data) {
        res.status(404).json({ success: false, message: `Record not found!` });
      } else {
        res.status(200).json({
          success: true,
          message: "This record was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message || `Could not delete this record`,
      });
    });
};
