const studentHelper = require("../../helpers/studentHelper");

describe("Filter common students", () => {
  test("should filter out students that are not registered to all teachers ", () => {
    // arrange
    const students = [
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
    const teachers = ["teacher1@example.com", "teacher2@example.com"];

    // Act
    const commonStudents = studentHelper.filterCommonStudents(
      students,
      teachers
    );

    // assert
    expect(commonStudents).toHaveLength(2);

    const studentEmails = commonStudents.map((student) => student.email);
    expect(studentEmails).toContain("commonstudent1@example.com");
    expect(studentEmails).toContain("commonstudent2@example.com");
    expect(studentEmails).not.toContain("student_only_teacher1@example.com");
    expect(studentEmails).not.toContain("student_only_teacher2@example.com");
  });

  test("should return empty array if no common teachers", () => {
    // arrange
    const students = [
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
    ];
    const teachers = [];

    // Act
    const commonStudents = studentHelper.filterCommonStudents(
      students,
      teachers
    );

    // assert
    expect(commonStudents).toHaveLength(0);

    const studentEmails = commonStudents.map((student) => student.email);
    expect(studentEmails).not.toContain("commonstudent1@example.com");
    expect(studentEmails).not.toContain("commonstudent2@example.com");
  });

  test("should return empty array if teacher is not specified", () => {
    // arrange
    const students = [
      {
        email: "student_only_teacher1@example.com",
        Teachers: [{ email: "teacher1@example.com" }],
      },
      {
        email: "student_only_teacher2@example.com",
        Teachers: [{ email: "teacher2@example.com" }],
      },
    ];
    const teachers = ["teacher1@example.com", "teacher2@example.com"];

    // Act
    const commonStudents = studentHelper.filterCommonStudents(
      students,
      teachers
    );

    // assert
    expect(commonStudents).toHaveLength(0);

    const studentEmails = commonStudents.map((student) => student.email);
    expect(studentEmails).not.toContain("student_only_teacher1@example.com");
    expect(studentEmails).not.toContain("student_only_teacher2@example.com");
  });
});
