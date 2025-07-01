const User = require("../models/User");
const { generateToken } = require("../utils/token");
const {validateUserInput} = require("../validations/auth.validation")
const ERROR = require("../utils/ERRORS")

exports.registerUser = async (data) => {
  let isValid = validateUserInput(data)
  if (isValid!=="") throw new Error(isValid); 
  
  const { name, email, password }=data
  const existing = await User.findOne({ email });
  if (existing) throw new Error(ERROR.ALREADYEXIST("user"));

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);
  return { token, user: { id: user._id, name: user.name, email: user.email } };
};

exports.isUserExist = async ({ email}) => {

}

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid credentials");
  }
  const token = generateToken(user._id);
  return { token, user: { id: user._id, name: user.name, email: user.email } };
};
