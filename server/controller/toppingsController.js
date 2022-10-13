const ToppingsModel = require("../models/Toppings");
const ToppingCategoryModel = require("../models/ToppingCategory");
const { ObjectId } = require("mongodb");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.topping || !req.body.category) {
    res
      .status(400)
      .send({ success: false, message: "Content can not be empty!" });
    return;
  }

  // Create a record
  const topping = new ToppingsModel({
    category: req.body.category,
    topping: req.body.topping,
  });

  // Save record in the database
  topping
    .save(topping)
    .then((data) => {
      res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while creating the Topping.",
      });
    });
};

// Retrieve all from the database.
// optional search by category if provided
// e.g. http://localhost:4000/pizza/v1.0.0/order/toppings?category=meat,cheese
// {
//   "success": true,
//   "toppings": [
//       {
//           "_id": "63462610410ceef5e6500bd3",
//           "category": "cheese",
//           "price": 1.5,
//           "list": [
//               {
//                   "_id": "6346eeb6c080e57a7dfdc944",
//                   "topping": "Asiago Cheese",
//                   "category": "63462610410ceef5e6500bd3"
//               },
//               {
//                   "_id": "6346f0bfc080e57a7dfdc952",
//                   "topping": "Cheddar Cheese",
//                   "category": "63462610410ceef5e6500bd3"
//               },
//               {
//                   "_id": "6346f0e8c080e57a7dfdc954",
//                   "topping": "Dairy Free Cheese",
//                   "category": "63462610410ceef5e6500bd3"
//               },
//               {
//                   "_id": "6346f0f1c080e57a7dfdc956",
//                   "topping": "Feta Cheese",
//                   "category": "63462610410ceef5e6500bd3"
//               },
//               {
//                   "_id": "6346f0fac080e57a7dfdc958",
//                   "topping": "Goat Cheese",
//                   "category": "63462610410ceef5e6500bd3"
//               },
//               {
//                   "_id": "6346f101c080e57a7dfdc95a",
//                   "topping": "Mozzarella Cheese",
//                   "category": "63462610410ceef5e6500bd3"
//               },
//               {
//                   "_id": "6346f114c080e57a7dfdc95c",
//                   "topping": "Parmigiano Cheese",
//                   "category": "63462610410ceef5e6500bd3"
//               }
//           ],
//           "id": "63462610410ceef5e6500bd3"
//       },
//       {
//           "_id": "63462574410ceef5e6500bd2",
//           "category": "meat",
//           "price": 2,
exports.findAll = (req, res) => {
  //  Query category is join with comma
  const categoryStringList = req.query.category?.split(",");

  // for _id, needs to convert to object
  // const idObjectList = idStringList.map(ObjectId);

  var condition = categoryStringList
    ? { category: { $in: categoryStringList } }
    : {};

  ToppingCategoryModel.find(condition)
    .populate({ path: "list", select: "topping" })
    .then((toppings) => res.status(200).json({ success: true, toppings }))
    .catch((err) =>
      res.status(400).json({
        success: false,
        message:
          err.message || "Some error occurred while retrieving the Toppings.",
      })
    );
};

// Update Toppings table  by the id in the request
// http://localhost:4000/pizza/v1.0.0/order/toppings/"634727bf994f8ef9d7e8306a"
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ success: false, message: "Data to update can not be empty!" });
  }

  const id = JSON.parse(req.params.id);
  const filter = { _id: ObjectId(id) };

  ToppingsModel.findByIdAndUpdate(filter, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).json({ success: false, message: `Record not found!` });
      } else
        res.status(200).json({
          success: true,
          message: "Topping was updated successfully.",
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

  ToppingsModel.findByIdAndDelete(filter)
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
