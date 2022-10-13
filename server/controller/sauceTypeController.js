const SauceTypeModel = require("../models/SauceType");
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
  const sauceType = new SauceTypeModel({
    name: req.body.name,
    desc: req.body.desc,
    image: req.body.image,
    amountType: req.body.amountType,
  });

  // Save record in the database
  sauceType
    .save(sauceType)
    .then((data) => {
      res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while creating the Sauce Type.",
      });
    });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
  SauceTypeModel.find()
    .then((sauce) => res.status(200).json({ success: true, sauce }))
    .catch((err) =>
      res.status(400).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving the Sauce Type.",
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

  SauceTypeModel.findByIdAndUpdate(filter, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).json({ success: false, message: `Record not found!` });
      } else
        res.status(200).json({
          success: true,
          message: "The Sauce Type was updated successfully.",
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

  SauceTypeModel.findByIdAndRemove(filter)
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
