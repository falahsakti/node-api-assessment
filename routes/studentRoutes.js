const express = require("express");
const {
  getCommonStudents,
  getStudentsForNotif,
  registerStudent,
  suspendStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.route("/register").post(registerStudent);
router.route("/commonstudents").get(getCommonStudents);
router.route("/suspend").post(suspendStudent);
router.route("/retrievefornotifications").post(getStudentsForNotif);

module.exports = router;
