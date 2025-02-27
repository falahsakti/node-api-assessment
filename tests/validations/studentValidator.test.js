const validator = require("../../validations/studentValidation");

describe("Register student validation", () => {
  test("should validate correct payload", () => {
    // arrange
    const payload1 = {
      teacher: "teacher@example.com",
      students: ["student@example.com"],
    };
    const payload2 = {
      teacher: "teacher@example.com",
      students: ["student1@example.com", "student2@example.com"],
    };
    // act
    const validationResult1 = validator.validateRegister(payload1);
    const validationResult2 = validator.validateRegister(payload2);

    // assert
    expect(validationResult1).toHaveProperty("valid", true);
    expect(validationResult2).toHaveProperty("valid", true);
  });

  test("should invalidate empty teacher", () => {
    // arrange
    const payload = {
      students: ["student1@example.com", "student2@example.com"],
    };
    // act
    const validationResult = validator.validateRegister(payload);

    // assert
    expect(validationResult).toHaveProperty("valid", false);
  });

  test("should invalidate incorrect teacher's email", () => {
    // arrange
    const payload = {
      teacher: "teacher",
      students: ["student1@example.com", "student2@example.com"],
    };
    // act
    const validationResult = validator.validateRegister(payload);

    // assert
    expect(validationResult).toHaveProperty("valid", false);
  });

  test("should invalidate incorrect student's email", () => {
    // arrange
    const payload = {
      teacher: "teacher@example.com",
      students: ["student1"],
    };
    // act
    const validationResult = validator.validateRegister(payload);

    // assert
    expect(validationResult).toHaveProperty("valid", false);
  });

  test("should invalidate if student is empty or null", () => {
    // arrange
    const payload1 = {
      teacher: "teacher@example.com",
    };
    const payload2 = {
      teacher: "teacher@example.com",
      students: [],
    };
    const payload3 = {
      teacher: "teacher@example.com",
      students: null,
    };
    // act
    const validationResult1 = validator.validateRegister(payload1);
    const validationResult2 = validator.validateRegister(payload2);
    const validationResult3 = validator.validateRegister(payload3);

    // assert
    expect(validationResult1).toHaveProperty("valid", false);
    expect(validationResult2).toHaveProperty("valid", false);
    expect(validationResult3).toHaveProperty("valid", false);
  });
});

describe("Retrieve common student validation", () => {
  test("should validate correct payload", () => {
    // arrange
    const payload = ["teacher1@example.com", "teacher2@example.com"];
    // act
    const validationResult = validator.validateCommonStudents(payload);

    // assert
    expect(validationResult).toHaveProperty("valid", true);
  });

  test("should invalidate empty teacher", () => {
    // arrange
    const payload1 = [];
    const payload2 = null;
    const payload3 = undefined;
    // act
    const validationResult1 = validator.validateCommonStudents(payload1);
    const validationResult2 = validator.validateCommonStudents(payload2);
    const validationResult3 = validator.validateCommonStudents(payload3);

    // assert
    expect(validationResult1).toHaveProperty("valid", false);
    expect(validationResult2).toHaveProperty("valid", false);
    expect(validationResult3).toHaveProperty("valid", false);
  });

  test("should invalidate incorrect teacher's email", () => {
    // arrange
    const payload1 = ["teacher1"];
    const payload2 = ["teacher1@example.com", "teacher2"];
    // act
    const validationResult1 = validator.validateCommonStudents(payload1);
    const validationResult2 = validator.validateCommonStudents(payload2);

    // assert
    expect(validationResult1).toHaveProperty("valid", false);
    expect(validationResult2).toHaveProperty("valid", false);
  });
});

describe("Suspend student validator", () => {
  test("should validate correct payload", () => {
    // arrange
    const payload = { student: "student@example.com" };
    // act
    const validationResult = validator.validateSuspend(payload);

    // assert
    expect(validationResult).toHaveProperty("valid", true);
  });

  test("should invalidate empty student", () => {
    // arrange
    const payload1 = { student: "" };
    const payload2 = { student: null };
    const payload3 = { student: [] };
    const payload4 = {};

    // act
    const validationResult1 = validator.validateSuspend(payload1);
    const validationResult2 = validator.validateSuspend(payload2);
    const validationResult3 = validator.validateSuspend(payload3);
    const validationResult4 = validator.validateSuspend(payload4);

    // assert
    expect(validationResult1).toHaveProperty("valid", false);
    expect(validationResult2).toHaveProperty("valid", false);
    expect(validationResult3).toHaveProperty("valid", false);
    expect(validationResult4).toHaveProperty("valid", false);
  });

  test("should invalidate incorrect student's email", () => {
    // arrange
    const payload1 = { student: "student" };
    const payload2 = { student: "student@example" };
    // act
    const validationResult1 = validator.validateSuspend(payload1);
    const validationResult2 = validator.validateSuspend(payload2);

    // assert
    expect(validationResult1).toHaveProperty("valid", false);
    expect(validationResult2).toHaveProperty("valid", false);
  });
});

describe("Get student for notification validation", () => {
  test("should validate correct payload", () => {
    // arrange
    const payload = {
      teacher: "teacher@example.com",
      notification: "Hello @student2@example.com @student2@example.com",
    };

    // act
    const validationResult = validator.validateNotification(payload);

    // assert
    expect(validationResult).toHaveProperty("valid", true);
  });

  test("should invalidate empty student", () => {
    // arrange
    const payload = {
      notification: "Hello @student2@example.com @student2@example.com",
    };

    // act
    const validationResult = validator.validateNotification(payload);

    // assert
    expect(validationResult).toHaveProperty("valid", false);
  });

  test("should invalidate incorrect teacher's email", () => {
    // arrange
    const payload = {
      teacher: "teacher",
      notification: "Hello @student2@example.com @student2@example.com",
    };

    // act
    const validationResult = validator.validateNotification(payload);

    // assert
    expect(validationResult).toHaveProperty("valid", false);
  });

  test("should invalidate missing notification", () => {
    // arrange
    const payload = {
      teacher: "teacher",
    };

    // act
    const validationResult = validator.validateNotification(payload);

    // assert
    expect(validationResult).toHaveProperty("valid", false);
  });
});
