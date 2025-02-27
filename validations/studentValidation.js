const emailHelper = require("../helpers/emailHelper");

const validateRegister = (payload) => {
  let valid = true;
  let messages = [];

  // Validate if teacher is specified
  if (!payload.teacher) {
    valid = false;
    messages.push("Missing teacher's data");
  }

  // validate if students are specified
  if (!payload.students || payload.students?.length === 0) {
    valid = false;
    messages.push("Missing students data");
  } else {
    // Validate student's email
    payload.students.forEach((student) => {
      if (!emailHelper.validateEmail(student)) {
        valid = false;
        messages.push(`Invalid student's email: ${student}`);
      }
    });
  }

  return {
    valid,
    message: messages.join(","),
  };
};

const validateCommonStudents = (teacherEmails) => {
  let valid = true;
  let messages = [];

  if (!teacherEmails || teacherEmails.length === 0) {
    valid = false;
    messages.push("Missing teachers data");
  } else {
    teacherEmails.forEach((email) => {
      if (!emailHelper.validateEmail(email)) {
        valid = false;
        messages.push(`Invalid teacher's email: ${email}`);
      }
    });
  }

  return {
    valid,
    message: messages.join(","),
  };
};

const validateSuspend = (payload) => {
  let valid = true;
  let messages = [];

  if (!payload.student) {
    valid = false;
    messages.push("Missing student to suspend");
  }

  return {
    valid,
    message: messages.join(","),
  };
};

const validateNotification = (payload) => {
  let valid = true;
  let messages = [];

  if (!payload.teacher) {
    valid = false;
    messages.push("Missing teacher data");
  }

  return {
    valid,
    message: messages.join(","),
  };
};

module.exports = {
  validateRegister,
  validateCommonStudents,
  validateSuspend,
  validateNotification,
};
