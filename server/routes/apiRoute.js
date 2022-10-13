var express = require("express");
var router = express.Router();

// Require controller modules.
var menu_controller = require("../controller/menuController");
var menu_choice_controller = require("../controller/menuChoiceController");
var menu_choice_by_category_controller = require("../controller/menuChoiceByCategoryController");
var sauce_controller = require("../controller/sauceTypeController");
var cheese_controller = require("../controller/cheeseTypeController");
var toppings_controller = require("../controller/toppingsController");

router.get("/order/menu", menu_controller.findAll);
router.post("/order/menu", menu_controller.create);
router.put("/order/menu/:id", menu_controller.update);
router.delete("/order/menu/:id", menu_controller.delete);

router.get("/order/menu-choice", menu_choice_controller.findAll);
router.post("/order/menu-choice", menu_choice_controller.create);
router.put("/order/menu-choice/:id", menu_choice_controller.update);
router.delete("/order/menu-choice/:id", menu_choice_controller.delete);

router.get(
  "/order/menu-choice-by-category",
  menu_choice_by_category_controller.findAll
);
router.post(
  "/order/menu-choice-by-category",
  menu_choice_by_category_controller.create
);
router.put(
  "/order/menu-choice-by-category/:id",
  menu_choice_by_category_controller.update
);
router.delete(
  "/order/menu-choice-by-category/:id",
  menu_choice_by_category_controller.delete
);

router.get("/order/sauce", sauce_controller.findAll);
router.post("/order/sauce", sauce_controller.create);
router.put("/order/sauce/:id", sauce_controller.update);
router.delete("/order/sauce/:id", sauce_controller.delete);

router.get("/order/cheese", cheese_controller.findAll);
router.post("/order/cheese", cheese_controller.create);
router.put("/order/cheese/:id", cheese_controller.update);
router.delete("/order/cheese/:id", cheese_controller.delete);

router.get("/order/toppings", toppings_controller.findAll);
router.post("/order/toppings", toppings_controller.create);
router.put("/order/toppings/:id", toppings_controller.update);
router.delete("/order/toppings/:id", toppings_controller.delete);

module.exports = router;
