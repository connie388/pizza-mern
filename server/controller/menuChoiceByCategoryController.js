const MenuChoiceByCategoryModel = require("../models/MenuChoiceByCategory");
const MenuCategoryModel = require("../models/MenuCategory");
const { ObjectId } = require("mongodb");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res
      .status(400)
      .send({ success: false, message: "Content can not be empty!" });
    return;
  }

  console.log("test");

  // Create a record
  const menuChoiceByCategory = new MenuChoiceByCategoryModel({
    category: req.body.category,
    shape: req.body.shape,
    size: req.body.size,
    amount: req.body.amount,
    information: req.body.information,
  });

  // Save record in the database
  menuChoiceByCategory
    .save(menuChoiceByCategory)
    .then((data) => {
      res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Some error occurred while creating the menu choice by category record.",
      });
    });
};

exports.findAll = (req, res) => {
  MenuCategoryModel.find()
    .populate({ path: "list" })
    .then((menuchoicebycategory) =>
      res.status(200).json({ success: true, menuchoicebycategory })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving the Toppings.",
      })
    );
};

exports.findById = (req, res) => {
  const id = JSON.parse(req.params.id);
  const filter = { _id: Object(id) };
  MenuChoiceByCategoryModel.find(filter)
    .lean()
    .then((menuchoicebycategory) =>
      res.status(200).json({ success: true, menuchoicebycategory })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message:
          err.message ||
          "Some error occurred while retrieving the Menu Choice By Category record.",
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

  MenuChoiceByCategoryModel.findByIdAndUpdate(filter, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).json({ success: false, message: `Record not found!` });
      } else
        res.status(200).json({
          success: true,
          message:
            "The menu choice by category record was updated successfully.",
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

  MenuChoiceByCategoryModel.findByIdAndDelete({ _id: ObjectId(id) })
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
