const { Student, Teacher, sequelize } = require("../models");
const { Op } = require("sequelize");

const registerStudentsToTeacher = async (students, teacher) => {
  await sequelize.transaction(async (t) => {
    for (let i = 0; i < students.length; i++) {
      // Find student. if not exist, then create.
      const [student, created] = await Student.findOrCreate({
        where: { email: students[i] },
        defaults: {
          email: students[i],
        },
      });

      // Register student to teacher
      await student.addTeacher(teacher);
    }
  });
};

const getAllStudentsByTeachersEmail = async (teachersEmail) => {
  const students = await Student.findAll({
    include: [
      {
        model: Teacher,
        as: "Teachers",
      },
    ],
    where: {
      "$Teachers.email$": teachersEmail,
    },
  });
  return students;
};

const getActiveStudentsByTeacher = async (teacher) => {
  const activeStudents = await Student.findAll({
    include: [
      {
        model: Teacher,
        where: {
          email: teacher.email,
        },
      },
    ],
    where: {
      suspended: false,
    },
    attributes: ["email"],
  });

  const activeStudentEmails = [...activeStudents.map((s1) => s1.email)];
  return activeStudentEmails;
};

const getActiveStudentsByEmails = async (emails) => {
  const activeStudents = await Student.findAll({
    attributes: ["email"],
    where: {
      suspended: false,
      email: emails,
    },
  });

  const activeStudentEmails = [...activeStudents.map((s1) => s1.email)];
  return activeStudentEmails;
};

const getStudentByEmail = async (email) => {
  const student = await Student.findOne({ where: { email: email } });
  return student;
};

const suspendStudent = async (student) => {
  student.suspended = true;
  await student.save();
  return student;
};

module.exports = {
  registerStudentsToTeacher,
  getAllStudentsByTeachersEmail,
  getActiveStudentsByTeacher,
  getActiveStudentsByEmails,
  getStudentByEmail,
  suspendStudent,
};
