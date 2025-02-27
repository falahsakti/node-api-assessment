const emailHelper = require("../helpers/emailHelper");

const validateRegister = (payload) => {
  let valid = true;
  let messages = [];

  // Validate if teacher is specified
  if (!payload.teacher) {
    valid = false;
    messages.push("Missing teacher's data");
  } else if (!emailHelper.isValidEmail(payload.teacher)) {
    valid = false;
    messages.push(`Invalid teacher's email: ${payload.teacher}`);
  }

  // validate if students are specified
  if (!payload.students || payload.students?.length === 0) {
    valid = false;
    messages.push("Missing students data");
  } else {
    // Validate student's email
    payload.students.forEach((student) => {
      if (!emailHelper.isValidEmail(student)) {
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
      if (!emailHelper.isValidEmail(email)) {
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
  } else if (!emailHelper.isValidEmail(payload.student)) {
    valid = false;
    messages.push(`Invalid student's email ${payload.email}`);
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
  } else if (!emailHelper.isValidEmail(payload.teacher)) {
    valid = false;
    messages.push(`Invalid teacher's email: ${payload.teacher}`);
  }

  if (!payload.notification) {
    valid = false;
    messages.push("Missing notification data");
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
