const ToppingCategoryModel = require("../models/ToppingCategory");
const { ObjectId } = require("mongodb");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.category || !req.body.price) {
    res
      .status(400)
      .send({ success: false, message: "Content can not be empty!" });
    return;
  }

  // Create a record
  const toppingCategory = new ToppingCategoryModel({
    category: req.body.category,
    price: req.body.price,
  });

  // Save record in the database
  toppingCategory
    .save(toppingCategory)
    .then((data) => {
      res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Some error occurred while creating the Topping Category.",
      });
    });
};

exports.findAll = (req, res) => {
  ToppingCategoryModel.find()
    .then((toppingcategory) =>
      res.status(200).json({ success: true, toppingcategory })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message:
          err.message ||
          "Some error occurred while retrieving the Toppings Category.",
      })
    );
};

exports.findById = (req, res) => {
  const id = JSON.parse(req.params.id);
  const filter = { _id: Object(id) };
  ToppingCategoryModel.find(filter)
    .lean()
    .then((toppingcategory) =>
      res.status(200).json({ success: true, toppingcategory })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message:
          err.message ||
          "Some error occurred while retrieving the Toppings Category record.",
      })
    );
};

// Update Toppings Category table  by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ success: false, message: "Data to update can not be empty!" });
  }

  const id = JSON.parse(req.params.id);
  const filter = { _id: ObjectId(id) };

  ToppingCategoryModel.findByIdAndUpdate(filter, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).json({ success: false, message: `Record not found!` });
      } else
        res.status(200).json({
          success: true,
          message: "Topping Category was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message || "Error updating the record",
      });
    });
};

// Delete a record with the specified id in the request
exports.delete = (req, res) => {
  const id = JSON.parse(req.params.id);
  const filter = { _id: ObjectId(id) };

  ToppingCategoryModel.findByIdAndDelete(filter)
    .then((data) => {
      if (!data) {
        res.status(404).json({ success: false, message: `Record not found!` });
      } else {
        res.json({
          success: true,
          message: "This record was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message || `Could not delete this record.`,
      });
    });
};
