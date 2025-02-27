const studentService = require("../../services/studentService");
const teacherRepository = require("../../repositories/teacherRepository");
const studentRepository = require("../../repositories/studentRepository");

jest.mock("../../repositories/teacherRepository");
jest.mock("../../repositories/studentRepository");

describe("Register student service", () => {
  test("should return success result", async () => {
    // arrange
    const payload = {
      teacher: "teacher@example.com",
      students: ["student1@example.com", "student2@example.com"],
    };
    const mockTeacher = { email: "teacher@example.com" };
    teacherRepository.getTeacherByEmail.mockResolvedValue(mockTeacher);

    // act
    const result = await studentService.registerStudent(payload);

    // assert
    expect(result.success).toBeTruthy();
  });
});

describe("Get Common Students", () => {
  test("should return success result", async () => {
    // arrange
    const payload = ["teacher1@example.com", "teacher2@example.com"];
    const mockStudents = [
      {
        email: "commonstudent1@example.com",
        Teachers: [
          { email: "teacher1@example.com" },
          { email: "teacher2@example.com" },
        ],
      },
      {
        email: "commonstudent2@example.com",
        Teachers: [
          { email: "teacher1@example.com" },
          { email: "teacher2@example.com" },
        ],
      },
      {
        email: "student_only_teacher1@example.com",
        Teachers: [{ email: "teacher1@example.com" }],
      },
      {
        email: "student_only_teacher2@example.com",
        Teachers: [{ email: "teacher2@example.com" }],
      },
    ];
    studentRepository.getAllStudentsByTeachersEmail.mockResolvedValue(
      mockStudents
    );

    // act
    const result = await studentService.getCommonStudents(payload);

    // assert
    expect(result.success).toBeTruthy();
    expect(result.data).toHaveProperty("students");
    expect(result.data.students).toHaveLength(2);
    expect(result.data.students).toContain("commonstudent1@example.com");
    expect(result.data.students).toContain("commonstudent2@example.com");
  });
});

describe("Suspend student service", () => {
  test("should return success value", async () => {
    // arrange
    const payload = { student: "student@example.com" };
    const mockStudent = {
      email: "student@example.com",
    };
    studentRepository.getStudentByEmail.mockResolvedValue(mockStudent);

    // act
    const result = await studentService.suspendStudent(payload);

    // assert
    expect(result.success).toBeTruthy();
  });
});

describe("Get students for notification service", () => {
  test("should return success value", async () => {
    // arrange
    const payload = {
      teacher: "teacher1@example.com",
      notification: "Hello @student1@example.com @student2@example.com",
    };
    const mockRegisteredStudents = [
      "registered_student1@example.com",
      "registered_student2@example.com",
    ];

    const mockMentionedStudents = [
      "student1@example.com",
      "student2@example.com",
    ];
    studentRepository.getActiveStudentsByTeacher.mockResolvedValue(
      mockRegisteredStudents
    );
    studentRepository.getActiveStudentsByEmails.mockResolvedValue(
      mockMentionedStudents
    );

    // act
    const result = await studentService.getStudentsForNotif(payload);

    // assert
    expect(result.success).toBeTruthy();
    expect(result.data.recipients).toHaveLength(4);
    expect(result.data.recipients).toContain("registered_student1@example.com");
    expect(result.data.recipients).toContain("registered_student2@example.com");
    expect(result.data.recipients).toContain("student1@example.com");
    expect(result.data.recipients).toContain("student2@example.com");
  });
});
