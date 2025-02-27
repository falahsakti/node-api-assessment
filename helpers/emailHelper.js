const validator = require("validator");

const getEmailMentions = (text) => {
  if (!text || typeof text !== "string" || !text instanceof String) {
    return [];
  }

  const mentionPattern =
    /\B@[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  let mentions = text.match(mentionPattern);

  if (!mentions) {
    return [];
  }

  // Remove @ prefix
  mentions = mentions.map((mention) => mention.substring(1));

  return mentions;
};

const isValidEmail = (email) => {
  if (typeof email === "string" || email instanceof String) {
    return validator.isEmail(email);
  } else {
    return false;
  }
};

module.exports = {
  getEmailMentions,
  isValidEmail,
};
