const MenuModel = require("../models/Menu");
const MenuCategoryModel = require("../models/MenuCategory");
const MenuChoiceModel = require("../models/MenuChoice");
const MenuChoiceByCategoryModel = require("../models/MenuChoiceByCategory");

const { ObjectId } = require("mongodb");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.category) {
    res
      .status(400)
      .send({ success: false, message: "Content can not be empty!" });
    return;
  }

  // Create a record
  const menu = new MenuModel({
    category: req.body.category,
    name: req.body.name,
    customize: req.body.customize,
    new: req.body.new,
    calory: req.body.calory,
    amount: req.body.amount,
    addons: req.body.addons,
    description: req.body.description,
    image: req.body.image,
  });

  // Save record in the database
  menu
    .save(menu)
    .then((data) => {
      res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while creating the menu record.",
      });
    });
};

// http://localhost:4000/pizza/v1.0.0/order/menu?category=sandwich
//"menu": [
//   {
//     "_id": "6347524f1582c8f19800d457",
//     "category": "634751e69e23c5f0236bd40d",
//     "name": "Chicken Caesar",
//     "customize": false,
//     "new": false,
//     "calory": "580 Cals/each",
//     "addons": [],
//     "description": "Grilled Chicken Breast topped with lettuce, tomato and Caesar Dressing",
//     "image": "https://weborders.pizzanova.com/PNStatic/web/images/Size552x426/PSWchickcaes.jpg",
//     "createdAt": "2022-10-12T23:48:31.243Z",
//     "updatedAt": "2022-10-12T23:48:31.243Z",
//     "__v": 0,
//     "type": [],
//     "choice": [
//         {
//             "_id": "6347528e778b68579b039c41",
//             "menu": "6347524f1582c8f19800d457",
//             "size": "No Bacon",
//             "amount": 8.99,
//             "information": "580 Cals/each"
//         },
//         {
//             "_id": "634752bf778b68579b03c5d2",
//             "menu": "6347524f1582c8f19800d457",
//             "size": "With Bacon",
//             "amount": 10.59,
//             "information": "670 Cals/each"
//         }
//     ],
//     "id": "6347524f1582c8f19800d457"
// },
// {
//     "_id": "634753351582c8f19800d45a",
//     "category": "634751e69e23c5f0236bd40d",
exports.findAll = async (req, res) => {
  var condition = {};
  if (req.query.category) {
    let data = await MenuCategoryModel.findOne({
      category: req.query.category,
    });

    condition = { category: data._id };
  }

  MenuModel.find(condition)
    .populate("type", "shape size amount information")
    .populate("choice", "size amount information")
    .then((menu) => res.status(200).json({ success: true, menu }))
    .catch((error) =>
      res
        .status(500)
        .json({
          success: false,
          message:
            error.message || "Some error occurred while retrieving the menu.",
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

  MenuModel.findByIdAndUpdate(filter, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).json({ success: false, message: `Record not found!` });
      } else
        res.status(200).json({
          success: true,
          message: "The menu record was updated successfully.",
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

  MenuModel.findByIdAndDelete({ _id: ObjectId(id) })
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
