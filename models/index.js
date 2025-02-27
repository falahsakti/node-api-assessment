"use strict";

const Sequelize = require("sequelize");
const config = require("../config/config");
const studentModel = require("./Student");
const teacherModel = require("./Teacher");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Init Model
const student = studentModel(sequelize, Sequelize.DataTypes);
const teacher = teacherModel(sequelize, Sequelize.DataTypes);

// Student - Teacher many to many association
student.belongsToMany(teacher, { through: "Student_Teachers" });
teacher.belongsToMany(student, { through: "Student_Teachers" });

db[student.name] = student;
db[teacher.name] = teacher;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
