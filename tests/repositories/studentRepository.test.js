const { Student, Teacher, sequelize } = require("../../models");
const studentRepository = require("../../repositories/studentRepository");

jest.mock("../../models");

describe("Register Students", () => {
  test("Should call find student and assign to teacher with transaction", async () => {
    // arrange
    const students = ["student@example.com"];
    const teacher = { email: "teacher@example.com" };
    const mockAddTeacher = jest.fn();
    const student = { addTeacher: mockAddTeacher };

    sequelize.transaction.mockImplementation(async (callback) => {
      callback();
    });
    Student.findOrCreate.mockResolvedValue([student, false]);

    // act
    await studentRepository.registerStudentsToTeacher(students, teacher);

    // assert
    expect(sequelize.transaction).toHaveBeenCalled();
    expect(Student.findOrCreate).toHaveBeenCalledTimes(1);
    expect(mockAddTeacher).toHaveBeenCalledTimes(1);
  });
});

describe("Get all students by teachers email", () => {
  test("should return correct students", async () => {
    // arrange
    const teachersEmail = ["teacher1@example.com", "teacher2@example.com"];
    const mockStudents = [
      {
        email: "student1@example.com",
        Teachers: [{ email: "teacher1@example.com" }],
      },
      {
        email: "student2@example.com",
        Teachers: [{ email: "teacher2@example.com" }],
      },
    ];
    Student.findAll.mockResolvedValue(mockStudents);

    // act
    const students = await studentRepository.getAllStudentsByTeachersEmail(
      teachersEmail
    );

    // assert
    expect(students).toHaveLength(2);
    expect(students[0]).toHaveProperty("email", "student1@example.com");
    expect(students[0]).toHaveProperty("Teachers");
    expect(students[1]).toHaveProperty("email", "student2@example.com");
    expect(students[1]).toHaveProperty("Teachers");
  });
});

describe("Get active students by teacher object", () => {
  test("should return correct students", async () => {
    // arrange
    const teacher = { email: "teacher@example.com" };
    const mockStudents = [
      {
        email: "student1@example.com",
        Teachers: [{ email: "teacher@example.com" }],
      },
      {
        email: "student2@example.com",
        Teachers: [{ email: "teacher@example.com" }],
      },
    ];
    Student.findAll.mockResolvedValue(mockStudents);
    const expectedStudentEmails = mockStudents.map(
      (mockStudent) => mockStudent.email
    );

    // act
    const students = await studentRepository.getActiveStudentsByTeacher(
      teacher
    );

    // assert
    expect(students).toHaveLength(2);
    expect(students).toEqual(expectedStudentEmails);
  });
});

describe("Get active students by emails", () => {
  test("should return correct students", async () => {
    // arrange
    const emails = ["student1@example.com", "student2@example.com"];
    const mockStudents = [
      {
        email: "student1@example.com",
      },
      {
        email: "student2@example.com",
      },
    ];
    Student.findAll.mockResolvedValue(mockStudents);
    const expectedStudentEmails = mockStudents.map(
      (mockStudent) => mockStudent.email
    );

    // act
    const students = await studentRepository.getActiveStudentsByEmails(emails);

    // assert
    expect(students).toHaveLength(2);
    expect(students).toEqual(expectedStudentEmails);
  });
});

describe("Get student by email", () => {
  test("should return correct student", async () => {
    // arrange
    const email = "student1@example.com";
    const mockStudent = {
      email: email,
    };
    Student.findOne.mockResolvedValue(mockStudent);

    // act
    const students = await studentRepository.getStudentByEmail(email);

    // assert
    expect(students).toHaveProperty("email", email);
  });
});

describe("Update student's suspended status", () => {
  test("should  and save", async () => {
    // arrange
    const mockSave = jest.fn();
    const student = {
      email: "student@example.com",
      suspended: false,
      save: mockSave,
    };

    // act
    const result = await studentRepository.suspendStudent(student);

    // assert
    expect(result.suspended).toBeTruthy();
  });
});
