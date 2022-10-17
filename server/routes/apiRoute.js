var express = require("express");
var router = express.Router();

// Require controller modules.
var menu_category_controller = require("../controller/menuCategoryController");
var menu_controller = require("../controller/menuController");
var menu_choice_controller = require("../controller/menuChoiceController");
var menu_choice_by_category_controller = require("../controller/menuChoiceByCategoryController");
var sauce_controller = require("../controller/sauceTypeController");
var sauce_amount_type_controller = require("../controller/sauceAmountTypeController");
var cheese_controller = require("../controller/cheeseTypeController");
var toppings_controller = require("../controller/toppingsController");

router.get("/order/menucategory", menu_category_controller.findAll);
router.get("/order/menucategory/:id", menu_category_controller.findById);
router.post("/order/menucategory", menu_category_controller.create);
router.put("/order/menucategory/:id", menu_category_controller.update);
router.delete("/order/menucategory/:id", menu_category_controller.delete);

router.get("/order/menu", menu_controller.findAll);
router.post("/order/menu", menu_controller.create);
router.put("/order/menu/:id", menu_controller.update);
router.delete("/order/menu/:id", menu_controller.delete);

router.get("/order/menuchoice", menu_choice_controller.findAll);
router.post("/order/menuchoice", menu_choice_controller.create);
router.put("/order/menuchoice/:id", menu_choice_controller.update);
router.delete("/order/menuchoice/:id", menu_choice_controller.delete);

router.get(
  "/order/menuchoicebycategory",
  menu_choice_by_category_controller.findAll
);
router.post(
  "/order/menuchoicebycategory",
  menu_choice_by_category_controller.create
);
router.put(
  "/order/menuchoicebycategory/:id",
  menu_choice_by_category_controller.update
);
router.delete(
  "/order/menuchoicebycategory/:id",
  menu_choice_by_category_controller.delete
);

router.get("/order/sauce", sauce_controller.findAll);
router.get("/order/sauce/:id", sauce_controller.findById);
router.post("/order/sauce", sauce_controller.create);
router.put("/order/sauce/:id", sauce_controller.update);
router.delete("/order/sauce/:id", sauce_controller.delete);

router.get("/order/sauceamount", sauce_amount_type_controller.findAll);
router.get("/order/sauceamount/:id", sauce_amount_type_controller.findById);
router.post("/order/sauceamount", sauce_amount_type_controller.create);
router.put("/order/sauceamount/:id", sauce_amount_type_controller.update);
router.delete("/order/sauceamount/:id", sauce_amount_type_controller.delete);

router.get("/order/cheese", cheese_controller.findAll);
router.get("/order/cheese/:id", cheese_controller.findById);
router.post("/order/cheese", cheese_controller.create);
router.put("/order/cheese/:id", cheese_controller.update);
router.delete("/order/cheese/:id", cheese_controller.delete);

router.get("/order/toppings", toppings_controller.findAll);
router.get("/order/toppings/:id", toppings_controller.findById);
router.post("/order/toppings", toppings_controller.create);
router.put("/order/toppings/:id", toppings_controller.update);
router.delete("/order/toppings/:id", toppings_controller.delete);

module.exports = router;
