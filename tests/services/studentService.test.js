const studentService = require("../../services/studentService");
const teacherRepository = require("../../repositories/teacherRepository");
const studentRepository = require("../../repositories/studentRepository");

jest.mock("../../repositories/teacherRepository");
jest.mock("../../repositories/studentRepository");

// Register student to teacher
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

  test("should return failed result if teacher field is missing", async () => {
    // arrange
    const payload = {
      students: ["student1@example.com", "student2@example.com"],
    };
    const mockTeacher = null;
    teacherRepository.getTeacherByEmail.mockResolvedValue(mockTeacher);

    // act
    const result = await studentService.registerStudent(payload);

    // assert
    expect(result.success).toBeFalsy();
  });

  test("should return failed result if teacher doesn't exist", async () => {
    // arrange
    const payload = {
      teacher: "teacher@example.com",
      students: ["student1@example.com", "student2@example.com"],
    };
    const mockTeacher = null;
    teacherRepository.getTeacherByEmail.mockResolvedValue(mockTeacher);

    // act
    const result = await studentService.registerStudent(payload);

    // assert
    expect(result.success).toBeFalsy();
  });

  test("should return failed result if repository throw error", async () => {
    // arrange
    const payload = {
      teacher: "teacher@example.com",
      students: ["student1@example.com", "student2@example.com"],
    };

    teacherRepository.getTeacherByEmail.mockImplementation(() => {
      throw new Error();
    });

    // act
    const result = await studentService.registerStudent(payload);

    // assert
    expect(result.success).toBeFalsy();
  });
});

// Retrieve Common Students
describe("Get Common Students", () => {
  test("should return success result when there's 1 specified teacher", async () => {
    // arrange
    const payload = ["teacher1@example.com"];
    const mockStudents = [
      {
        email: "commonstudent1@example.com",
        Teachers: [{ email: "teacher1@example.com" }],
      },
      {
        email: "student_only_teacher1@example.com",
        Teachers: [{ email: "teacher1@example.com" }],
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
    expect(result.data.students).toContain("student_only_teacher1@example.com");
  });
  test("should return success result when 2 or more teachers are specified", async () => {
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

  test("should return success result even if no student match", async () => {
    // arrange
    const payload = ["teacher1@example.com"];
    const mockStudents = [];
    studentRepository.getAllStudentsByTeachersEmail.mockResolvedValue(
      mockStudents
    );

    // act
    const result = await studentService.getCommonStudents(payload);

    // assert
    expect(result.success).toBeTruthy();
    expect(result.data).toHaveProperty("students");
    expect(result.data.students).toHaveLength(0);
  });

  test("should return failed result when no specified teacher", async () => {
    // arrange
    const payload = [];
    const mockStudents = [];
    studentRepository.getAllStudentsByTeachersEmail.mockResolvedValue(
      mockStudents
    );

    // act
    const result = await studentService.getCommonStudents(payload);

    // assert
    expect(result.success).toBeFalsy();
  });

  test("should return failed result when repository throw error", async () => {
    // arrange
    const payload = ["teacher1@example.com"];
    studentRepository.getAllStudentsByTeachersEmail.mockImplementation(() => {
      throw new Error();
    });

    // act
    const result = await studentService.getCommonStudents(payload);

    // assert
    expect(result.success).toBeFalsy();
  });
});

// Suspend students
describe("Suspend student service", () => {
  test("should return success result", async () => {
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

  test("should return failed result if no specified student", async () => {
    // arrange
    const payload = {};
    const mockStudent = null;
    studentRepository.getStudentByEmail.mockResolvedValue(mockStudent);

    // act
    const result = await studentService.suspendStudent(payload);

    // assert
    expect(result.success).toBeFalsy();
  });

  test("should return failed result if student does not exist", async () => {
    // arrange
    const payload = { student: "student@example.com" };
    const mockStudent = null;
    studentRepository.getStudentByEmail.mockResolvedValue(mockStudent);

    // act
    const result = await studentService.suspendStudent(payload);

    // assert
    expect(result.success).toBeFalsy();
  });

  test("should return failed result if repository throw error", async () => {
    // arrange
    const payload = { student: "student@example.com" };
    studentRepository.getStudentByEmail.mockImplementation(() => {
      throw new Error();
    });

    // act
    const result = await studentService.suspendStudent(payload);

    // assert
    expect(result.success).toBeFalsy();
  });
});

describe("Get students for notification service", () => {
  test("should return success result with correct mentions", async () => {
    // arrange
    const payload = {
      teacher: "teacher1@example.com",
      notification: "Hello @student1@example.com @student2@example.com",
    };
    const mockTeacher = { email: "teacher@example.com" };
    const mockRegisteredStudents = [
      "registered_student1@example.com",
      "registered_student2@example.com",
    ];

    const mockMentionedStudents = [
      "student1@example.com",
      "student2@example.com",
    ];

    teacherRepository.getTeacherByEmail.mockResolvedValue(mockTeacher);
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

  test("should return success result with no mentions", async () => {
    // arrange
    const payload = {
      teacher: "teacher1@example.com",
      notification: "Hello students",
    };
    const mockTeacher = { email: "teacher@example.com" };
    const mockRegisteredStudents = [
      "registered_student1@example.com",
      "registered_student2@example.com",
    ];

    const mockMentionedStudents = [];

    teacherRepository.getTeacherByEmail.mockResolvedValue(mockTeacher);
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
    expect(result.data.recipients).toHaveLength(2);
    expect(result.data.recipients).toContain("registered_student1@example.com");
    expect(result.data.recipients).toContain("registered_student2@example.com");
  });

  test("should return failed result if no specified teacher", async () => {
    // arrange
    const payload = {
      notification: "Hello @student1@example.com @student2@example.com",
    };
    const mockTeacher = { email: "teacher@example.com" };
    const mockRegisteredStudents = [
      "registered_student1@example.com",
      "registered_student2@example.com",
    ];

    const mockMentionedStudents = [
      "student1@example.com",
      "student2@example.com",
    ];

    teacherRepository.getTeacherByEmail.mockResolvedValue(mockTeacher);
    studentRepository.getActiveStudentsByTeacher.mockResolvedValue(
      mockRegisteredStudents
    );
    studentRepository.getActiveStudentsByEmails.mockResolvedValue(
      mockMentionedStudents
    );

    // act
    const result = await studentService.getStudentsForNotif(payload);

    // assert
    expect(result.success).toBeFalsy();
  });

  test("should return failed result if teacher doesn't exist", async () => {
    // arrange
    const payload = {
      teacher: "teacher1@example.com",
      notification: "Hello @student1@example.com @student2@example.com",
    };
    const mockTeacher = null;
    const mockRegisteredStudents = [
      "registered_student1@example.com",
      "registered_student2@example.com",
    ];

    const mockMentionedStudents = [
      "student1@example.com",
      "student2@example.com",
    ];

    teacherRepository.getTeacherByEmail.mockResolvedValue(mockTeacher);
    studentRepository.getActiveStudentsByTeacher.mockResolvedValue(
      mockRegisteredStudents
    );
    studentRepository.getActiveStudentsByEmails.mockResolvedValue(
      mockMentionedStudents
    );

    // act
    const result = await studentService.getStudentsForNotif(payload);

    // assert
    expect(result.success).toBeFalsy();
  });

  test("should return failed result if teacher repository throw error", async () => {
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

    teacherRepository.getTeacherByEmail.mockImplementation(() => {
      throw new Error();
    });
    studentRepository.getActiveStudentsByTeacher.mockResolvedValue(
      mockRegisteredStudents
    );
    studentRepository.getActiveStudentsByEmails.mockResolvedValue(
      mockMentionedStudents
    );

    // act
    const result = await studentService.getStudentsForNotif(payload);

    // assert
    expect(result.success).toBeFalsy();
  });

  test("should return failed result if student repository throw error", async () => {
    // arrange
    const payload = {
      teacher: "teacher1@example.com",
      notification: "Hello @student1@example.com @student2@example.com",
    };
    const mockTeacher = { email: "teacher@example.com" };
    const mockMentionedStudents = [
      "student1@example.com",
      "student2@example.com",
    ];

    teacherRepository.getTeacherByEmail.mockResolvedValue(mockTeacher);
    studentRepository.getActiveStudentsByTeacher.mockImplementation(() => {
      throw new Error();
    });
    studentRepository.getActiveStudentsByEmails.mockResolvedValue(
      mockMentionedStudents
    );

    // act
    const result = await studentService.getStudentsForNotif(payload);

    // assert
    expect(result.success).toBeFalsy();
  });
});
