const SauceAmountTypeModel = require("../models/SauceAmountType");
const SauceTypeModel = require("../models/SauceType");
const { ObjectId } = require("mongodb");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res
      .status(400)
      .send({ success: false, message: "Content can not be empty!" });
    return;
  }

  // Create a record
  const sauceAmountType = new SauceAmountTypeModel({
    type: req.body.type,
  });

  // Save record in the database
  sauceAmountType
    .save(sauceAmountType)
    .then((data) => {
      res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Some error occurred while creating the Sauce Amount Type.",
      });
    });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
  SauceAmountTypeModel.find()
    .then((sauce) => res.status(200).json({ success: true, sauce }))
    .catch((err) =>
      res.status(400).json({
        success: false,
        message:
          err.message ||
          "Some error occurred while retrieving the Sauce Amount Type.",
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

  SauceAmountTypeModel.findByIdAndUpdate(filter, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).json({ success: false, message: `Record not found!` });
      } else
        res.status(200).json({
          success: true,
          message: "The Sauce Amount Type was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message || "Error updating the record ",
      });
    });
};

// Delete a record with the specified id in the request
exports.delete = (req, res) => {
  const id = JSON.parse(req.params.id);
  const filter = { _id: ObjectId(id) };

  SauceAmountTypeModel.findByIdAndRemove(filter)
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
        message: err.message || `Could not delete this record `,
      });
    });
};
