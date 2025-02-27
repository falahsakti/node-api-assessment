const getEmailMentions = (text) => {
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

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

module.exports = {
  getEmailMentions,
  validateEmail,
};
