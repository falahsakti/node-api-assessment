const { Teacher } = require("../../models");
const teacherRepository = require("../../repositories/teacherRepository");

jest.mock("../../models");

describe("Get student by email", () => {
  test("should return correct student", async () => {
    // arrange
    const email = "teacher@example.com";
    const mockTeacher = {
      email: email,
    };
    Teacher.findOne.mockResolvedValue(mockTeacher);

    // act
    const teacher = await teacherRepository.getTeacherByEmail(email);

    // assert
    expect(teacher).toHaveProperty("email", email);
  });
});
