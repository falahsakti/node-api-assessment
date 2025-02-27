const asyncHandler = require("express-async-handler");
const studentService = require("../services/studentService");

// @Desc    Register one or more students to a specified teacher
// @route   POST /api/reguster
// @access  Public
const registerStudent = asyncHandler(async (req, res) => {
  const result = await studentService.registerStudent(req.body);

  if (result.success) {
    res.status(204).json();
  } else {
    res.status(400);
    throw new Error(`Error when registering student: ${result.message}`);
  }
});

// @Desc    Retrieve a list of students common to a given list of teachers
// @route   GET /api/commonStudents
// @access  Public
const getCommonStudents = asyncHandler(async (req, res) => {
  let teachers = req.query.teacher;
  if (teachers && !Array.isArray(teachers)) {
    teachers = [teachers];
  }

  const result = await studentService.getCommonStudents(teachers);

  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(400);
    throw new Error(`Error when retrieving common students: ${result.message}`);
  }
});

// @Desc    Suspend a specified student.
// @route   POST /api/suspend
// @access  Public
const suspendStudent = asyncHandler(async (req, res) => {
  const result = await studentService.suspendStudent(req.body);

  if (result.success) {
    res.status(204).json();
  } else {
    res.status(400);
    throw new Error(`Error when suspending student: ${result.message}`);
  }
});

// @Desc    Retrieve a list of students who can receive a given notification
// @route   POST /api/retrievefornotifications
// @access  Public
const getStudentsForNotif = asyncHandler(async (req, res) => {
  const result = await studentService.getStudentsForNotif(req.body);

  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(400);
    throw new Error(
      `Error when retrieving students for notifications: ${result.message}`
    );
  }
});

module.exports = {
  registerStudent,
  getCommonStudents,
  suspendStudent,
  getStudentsForNotif,
};
