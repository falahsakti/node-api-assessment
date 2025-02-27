const { isValidEmail, getEmailMentions } = require("../../helpers/emailHelper");

describe("Email Validator", () => {
  test("should validate correct emails", () => {
    expect(isValidEmail("abc@example.com")).toBeTruthy();
    expect(isValidEmail("test.email+sample+user@example.com")).toBeTruthy();
    expect(isValidEmail("a@example.com")).toBeTruthy();
  });

  test("should invalidate incorrect email", () => {
    expect(isValidEmail("username")).toBeFalsy();
    expect(isValidEmail("sample@.com")).toBeFalsy();
    expect(isValidEmail("@example.com")).toBeFalsy();
    expect(isValidEmail("user@com")).toBeFalsy();
    expect(isValidEmail("user@example..com")).toBeFalsy();
  });

  test("should invalidate null or empty email", () => {
    expect(isValidEmail("")).toBeFalsy();
    expect(isValidEmail(null)).toBeFalsy();
    expect(isValidEmail(undefined)).toBeFalsy();
  });

  test("should Invalidate non strings", () => {
    expect(isValidEmail(0)).toBeFalsy();
    expect(isValidEmail([])).toBeFalsy();
    expect(isValidEmail(true)).toBeFalsy();
    expect(isValidEmail({})).toBeFalsy();
  });
});

describe("Get Email Mentions", () => {
  test("should return correct emails", () => {
    expect(getEmailMentions("Hello @sample@example.com")).toEqual([
      "sample@example.com",
    ]);
    expect(getEmailMentions("@sample@example.com")).toEqual([
      "sample@example.com",
    ]);
    expect(getEmailMentions("@@sample@example.com")).toEqual([
      "sample@example.com",
    ]);
    expect(
      getEmailMentions("@sample1@example.com @sample2@example.com")
    ).toEqual(["sample1@example.com", "sample2@example.com"]);
    expect(
      getEmailMentions(
        "@sample1@example.com @sample2@example.com @sample3@example.com"
      )
    ).toEqual([
      "sample1@example.com",
      "sample2@example.com",
      "sample3@example.com",
    ]);
  });

  test("should not detect non email mentions", () => {
    expect(getEmailMentions("Hello @sample")).toEqual([,]);
    expect(getEmailMentions("@sample@examplecom")).toEqual([,]);
    expect(getEmailMentions("@@sample@@")).toEqual([,]);
    expect(getEmailMentions("@sample1@example.com @sample2.com")).toEqual([
      "sample1@example.com",
    ]);
    expect(
      getEmailMentions(
        "@sample1@example.com @@example.com @sample3@example.com"
      )
    ).toEqual(["sample1@example.com", "sample3@example.com"]);
  });

  test("should not detect email without mentions", () => {
    expect(getEmailMentions("Hello sample@example.com")).toEqual([]);
    expect(getEmailMentions("sample@examplecom")).toEqual([]);
    expect(getEmailMentions("sample1@example.com sample2@example.com")).toEqual(
      []
    );
    expect(
      getEmailMentions("sample1@example.com example.com sample3@example.com")
    ).toEqual([]);
  });

  test("should return empty array if text is null, empty, or whitespace", () => {
    expect(getEmailMentions("")).toEqual([]);
    expect(getEmailMentions(null)).toEqual([]);
    expect(getEmailMentions(" ")).toEqual([]);
    expect(getEmailMentions(undefined)).toEqual([]);
  });
});
