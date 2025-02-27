const { Student, Teacher, sequelize } = require("../models");
const { Op } = require("sequelize");

const getTeacherByEmail = async (email) => {
  const teacher = await Teacher.findOne({
    where: { email: email },
  });

  return teacher;
};

module.exports = {
  getTeacherByEmail,
};
