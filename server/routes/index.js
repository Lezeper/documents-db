var express = require("express");
var router = express.Router();
var jwt = require("express-jwt");
var config = require("../config");

var userCtrl = require("../controllers/user");
var questionCtrl = require("../controllers/question");
var docCtrl = require("../controllers/document");
var seachCtrl = require("../controllers/search");

var auth = jwt({
  secret: config.secretKey,
  userProperty: "payload"
});

router.get("/user", userCtrl.findAllUsers);
router.get("/user/:id", userCtrl.findUserById);
router.post("/login", userCtrl.login);
router.post("/user", userCtrl.createUser);
router.put("/user", userCtrl.updateUser);
router.delete("/user", userCtrl.deleteUser);
/*
router.get("/q", questionCtrl.findAllQuestionCategories);
router.get("/q/c/:category", questionCtrl.findQuestionsByCategory);
router.get('/q/:id', questionCtrl.findQuestionById);
router.post("/q", questionCtrl.createQuestion);
router.put("/q", questionCtrl.updateQuestion);
router.delete("/q/:id", questionCtrl.deleteQuestion);
*/
router.get('/doc/id/:id', docCtrl.findDocById);
router.get("/doc", docCtrl.findAllDocCategories);
router.get("/doc/c/:category", docCtrl.findDocByCategory);
router.post("/doc", docCtrl.createDoc);
router.put("/doc", docCtrl.updateDoc);
router.delete("/doc/:id", docCtrl.deleteDoc);

router.get("/s/q/:keyword?", seachCtrl.getQuestionByKeyword);
router.get("/s/d/:keyword?", seachCtrl.getDocByKeyword);

module.exports = router;