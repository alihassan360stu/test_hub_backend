const authService = require("../services/auth.service");
const ERROR = require("../utils/ERRORS");
const {positive , negative} = require("../utils/responseTypes")

exports.register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(positive(data=result,message="user register successfully"));
  } catch (error) {
    res.status(400).json(negative(message= error.message || ERROR.WENTWRONG));
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message || ERROR.WENTWRONG });
  }
};

exports.isUserExist = async (req, res) => {
  try {
    const result = await authService.isUserExist(req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ message: error.message || ERROR.WENTWRONG });
  }
};
