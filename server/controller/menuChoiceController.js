const MenuChoiceModel = require("../models/MenuChoice");
const MenuModel = require("../models/Menu");
const { ObjectId } = require("mongodb");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res
      .status(400)
      .send({ success: false, message: "Content can not be empty!" });
    return;
  }

  // Create a record
  const menuChoice = new MenuChoiceModel({
    menu: req.body.menu, // MenuCategory._id
    size: req.body.size,
    amount: req.body.amount,
    information: req.body.information,
  });

  // Save record in the database
  menuChoice
    .save(menuChoice)
    .then((data) => {
      res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Some error occurred while creating the menu choice record.",
      });
    });
};

exports.findAll = (req, res) => {
  MenuChoiceModel.find()
    .then((choice) => res.status(200).json({ success: true, choice }))
    .catch((error) =>
      res.status(500).json({
        success: false,
        message:
          error.message ||
          "Some error occurred while retrieving the menu choice.",
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

  MenuChoiceModel.findByIdAndUpdate(filter, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).json({ success: false, message: `Record not found!` });
      } else
        res.status(200).json({
          success: true,
          message: "The menu choice record was updated successfully.",
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

  MenuChoiceModel.findByIdAndDelete({ _id: ObjectId(id) })
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
