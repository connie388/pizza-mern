const MenuCategoryModel = require("../models/MenuCategory");
const { ObjectId } = require("mongodb");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.category) {
    res
      .status(400)
      .send({ success: false, message: "Content can not be empty!" });
    return;
  }

  // Create a record
  const menucategory = new MenuCategoryModel({
    category: req.body.category,
  });

  // Save record in the database
  menucategory
    .save(menucategory)
    .then((data) => {
      res.status(200).json({ success: true, menucategory });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Some error occurred while creating the Menu Category.",
      });
    });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
  MenuCategoryModel.find()
    .lean()
    .then((menucategory) =>
      res.status(200).json({ success: true, menucategory })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message:
          err.message ||
          "Some error occurred while retrieving the Menu Category.",
      })
    );
};

exports.findById = (req, res) => {
  const id = JSON.parse(req.params.id);
  const filter = { _id: Object(id) };
  MenuCategoryModel.find(filter)
    .lean()
    .then((menucategory) =>
      res.status(200).json({ success: true, menucategory })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message:
          err.message ||
          "Some error occurred while retrieving the Menu Category record.",
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

  MenuCategoryModel.findByIdAndUpdate(filter, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).json({ success: false, message: `Record not found!` });
      } else
        res.status(200).json({
          success: true,
          message: "The Menu Category was updated successfully.",
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

  MenuCategoryModel.findByIdAndDelete({ _id: ObjectId(id) })
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
