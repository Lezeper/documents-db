var express = require("express");
var router = express.Router();
var jwt = require("express-jwt");
var config = require("../config");

var userCtrl = require("../controllers/user");
var questionCtrl = require("../controllers/question");
var docCtrl = require("../controllers/document");
var seachCtrl = require("../controllers/search");
var categoryCtrl = require("../controllers/category");
var countCtrl = require("../controllers/count");
var logCtrl = require("../controllers/log");
var settingsCtrl = require("../controllers/settings");

var auth = jwt({
  secret: config.secretKey
});

router.get("/user", userCtrl.findAllUsers);
router.get("/user/:id", userCtrl.findUserById);
// router.post("/user", userCtrl.createUser);
// router.put("/user", userCtrl.updateUser);
// router.delete("/user", userCtrl.deleteUser);

// router.get("/que/c", questionCtrl.findAllQuesCategories);
router.get("/que/c/:category", questionCtrl.findQuesByCategory);
router.get("/que/id/:id", questionCtrl.findQuesById);
router.post("/que", auth, questionCtrl.createQuestion);
router.put("/que", auth, questionCtrl.updateQuestion);
router.delete("/que/id/:id", auth, questionCtrl.deleteQuestion);

router.get("/cat/:group", logCtrl.createLog, categoryCtrl.findCategoriesByGroup);
router.post("/cat", auth, categoryCtrl.createCategory);
router.put("/cat", auth, categoryCtrl.updateCategory);
router.delete("/cat/id/:id", auth, categoryCtrl.deleteCategory);

// router.get("/doc/c", logCtrl.createLog, docCtrl.findAllDocCategories);
router.get("/doc/c/:category", docCtrl.findDocsByCategory);
router.get("/doc/id/:id", docCtrl.findDocById);
router.post("/doc", auth, docCtrl.createDoc);
router.put("/doc", auth, docCtrl.updateDoc);
router.delete("/doc/id/:id", auth, docCtrl.deleteDoc);

router.get("/count/doc", countCtrl.countDoc);
router.get("/count/que", countCtrl.countQue);
router.get("/count/doc/:category", countCtrl.countDocByCategory);
router.get("/count/que/:category", countCtrl.countQueByCategory);
router.get("/count/que/all/:answer", countCtrl.countQueByAnswer);

router.get("/log?", auth, logCtrl.findAllLogs);
router.delete("/log", auth, logCtrl.deleteAllLogs);

router.get("/settings", settingsCtrl.findSettings);
router.put("/settings", auth, settingsCtrl.updateSettings);
router.delete("/settings", auth, settingsCtrl.deleteSettings);
router.get("/settings/dbbu", auth, settingsCtrl.doDBBackup);

router.get("/s/q/:keyword?", seachCtrl.findAllQuesByKeyword);
router.get("/s/d/:keyword?", seachCtrl.findAllDocsByKeyword);

router.post("/login", userCtrl.login);

module.exports = router;