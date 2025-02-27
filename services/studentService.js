const teacherRepository = require("../repositories/teacherRepository");
const studentRepository = require("../repositories/studentRepository");
const validator = require("../validations/studentValidation");
const emailHelper = require("../helpers/emailHelper");
const studentHelper = require("../helpers/studentHelper");

const registerStudent = async (payload) => {
  // Validate request payload
  const validationResult = validator.validateRegister(payload);
  if (!validationResult.valid) {
    return {
      success: false,
      message: `Invalid registration data: ${validationResult.message}`,
    };
  }

  try {
    // Get teacher
    const teacher = await teacherRepository.getTeacherByEmail(payload.teacher);
    if (!teacher) {
      return {
        success: false,
        message: `Teacher ${payload.teacher} does not exist`,
      };
    }

    // Register students and assign teacher
    await studentRepository.registerStudentsToTeacher(
      payload.students,
      teacher
    );

    return {
      success: true,
      data: payload,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getCommonStudents = async (teachersEmail) => {
  // Validate request params
  const validationResult = validator.validateCommonStudents(teachersEmail);
  if (!validationResult.valid) {
    return {
      success: false,
      message: `Invalid common students data: ${validationResult.message}`,
    };
  }

  try {
    // Get all students who are registered to teachers
    const students = await studentRepository.getAllStudentsByTeachersEmail(
      teachersEmail
    );

    // Filter common students if there are more than 1 teacher in the request
    const commonStudents =
      teachersEmail.length > 1
        ? studentHelper.filterCommonStudents(students, teachersEmail)
        : students;

    return {
      success: true,
      data: {
        students: commonStudents.map((student) => student.email),
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const suspendStudent = async (payload) => {
  // Validate request payload
  const validationResult = validator.validateSuspend(payload);
  if (!validationResult.valid) {
    return {
      success: false,
      message: `Invalid suspend student data: ${validationResult.message}`,
    };
  }

  try {
    // Get student data
    const student = await studentRepository.getStudentByEmail(payload.student);
    if (!student) {
      return {
        success: false,
        message: `Student ${payload.student} does not exist`,
      };
    }

    // Update suspeded status
    await studentRepository.suspendStudent(student);

    return {
      success: true,
      data: payload,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getStudentsForNotif = async (payload) => {
  // Validate request payload
  const validationResult = validator.validateNotification(payload);
  if (!validationResult.valid) {
    return {
      success: false,
      message: `Invalid student notification payload: ${validationResult.message}`,
    };
  }

  try {
    // Get teacher
    const teacher = await teacherRepository.getTeacherByEmail(payload.teacher);
    if (!teacher) {
      return {
        success: false,
        message: `Teacher ${payload.teacher} does not exist`,
      };
    }

    // Get students who are registered to teacher and not suspended
    let allStudents = await studentRepository.getActiveStudentsByTeacher(
      teacher
    );

    // Get students who are mentioned
    const emailMentions = emailHelper.getEmailMentions(payload.notification);
    if (emailMentions && emailMentions.length > 0) {
      const mentionedStudents =
        await studentRepository.getActiveStudentsByEmails(emailMentions);

      allStudents = [...allStudents, ...mentionedStudents];
    }

    // Remove duplicates
    const students = [...new Set(allStudents)];

    return {
      success: true,
      data: { recipients: students },
      message: "",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  registerStudent,
  getCommonStudents,
  suspendStudent,
  getStudentsForNotif,
};
