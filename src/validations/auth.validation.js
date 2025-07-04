const validateUserInput = (data) => {
  const requiredFields = [
    "name",
    "last_name",
    "user_id",
    "password",
    "status",
    "district",
    "address"
  ];
  requiredFields.forEach((field) => {
    const value = data[field];

    if (value === undefined || value === null) {
      return `${field} is required`;
    } else if (typeof value === "string" && value.trim() === "") {
      return `${field} is required`;
    }
  });
  return ""
};

module.exports = {
  validateUserInput
};
